import { createHash } from "node:crypto";
import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { jsonClient } from "./client.mjs";

const MANAGER = "portfolio-branch-previews-v1";
export const SHARED_KEYS = ["PREVIEW_DIRECTUS_URL", "PREVIEW_DIRECTUS_ASSET_TOKEN", "PREVIEW_REVALIDATION_SECRET"];
export class StaleRun extends Error {}

export function previewIdentity(repository, branch) {
  if (repository?.toLowerCase() !== "4furki4/the-portfolio") throw new Error("Unexpected repository");
  if (!branch || /[\x00-\x20\x7f]/.test(branch) || ["main", "develop"].includes(branch.toLowerCase())) {
    throw new Error("A feature branch is required; main and develop are excluded");
  }
  const hash = createHash("sha256").update(`${repository.toLowerCase()}\0${branch}`).digest("hex").slice(0, 12);
  const slug = branch.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/g, "") || "branch";
  const hostname = `portfolio-${slug}-${hash}.furkan-cengiz.com`;
  return { repository: repository.toLowerCase(), branch, hash, name: `preview-portfolio-${hash}`, hostname, url: `https://${hostname}` };
}

export function ownership(identity, environmentUuid) {
  return JSON.stringify({ managedBy: MANAGER, repository: identity.repository, branch: identity.branch, identity: identity.hash, environmentUuid });
}

export function isOwned(resource, identity, environmentUuid) {
  return resource.name === identity.name && resource.description === ownership(identity, environmentUuid);
}

function uuid(value) {
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(value ?? "")) throw new Error("Invalid Coolify UUID");
  return value;
}

export async function assertCurrent({ github, identity, sha, deleting = false }) {
  const ref = await github(`/repos/${identity.repository}/git/ref/heads/${encodeURIComponent(identity.branch)}`, { missing: true });
  if (deleting ? ref !== null : ref?.object?.sha !== sha) {
    throw new StaleRun(deleting ? "Branch exists; cleanup skipped" : "Branch head changed or was deleted; deployment skipped");
  }
}

export function previewCompose(identity, sha, digest) {
  if (!/^[a-f0-9]{40}$/.test(sha ?? "")) throw new Error("A full commit SHA is required");
  if (!/^sha256:[a-f0-9]{64}$/.test(digest ?? "")) throw new Error("A published immutable image digest is required");
  const middleware = `${identity.name}-headers`;
  return {
    networks: { cms: { external: true, name: "portfolio-preview-cms" } },
    services: { app: {
      image: `furki4/the-portfolio@${digest}`, restart: "unless-stopped", init: true,
      security_opt: ["no-new-privileges:true"], cap_drop: ["ALL"], tmpfs: ["/tmp"],
      mem_limit: "768m", cpus: 1, networks: ["cms"],
      logging: { driver: "json-file", options: { "max-size": "10m", "max-file": "3" } },
      environment: {
        NODE_ENV: "production", HOSTNAME: "0.0.0.0", PORT: "3000",
        DIRECTUS_URL: "${DIRECTUS_URL:-{{environment.PREVIEW_DIRECTUS_URL}}}",
        DIRECTUS_PUBLIC_URL: "https://cms.furkan-cengiz.com",
        DIRECTUS_ASSET_TOKEN: "${DIRECTUS_ASSET_TOKEN:-{{environment.PREVIEW_DIRECTUS_ASSET_TOKEN}}}",
        REVALIDATION_SECRET: "${REVALIDATION_SECRET:-{{environment.PREVIEW_REVALIDATION_SECRET}}}",
      },
      healthcheck: {
        test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"],
        interval: "15s", timeout: "5s", retries: 12, start_period: "30s",
      },
      labels: {
        [`traefik.http.middlewares.${middleware}.headers.customresponseheaders.X-Robots-Tag`]: "noindex, nofollow",
        [`traefik.http.middlewares.${middleware}.headers.customresponseheaders.X-Preview-Commit`]: sha,
        "coolify.traefik.middlewares": middleware,
        "com.centurylinklabs.watchtower.enable": "false",
      },
    } },
  };
}

export async function runLifecycle({ action, identity, sha, digest, config, coolify, github, fetchImpl = fetch, wait = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now }) {
  if (!["deploy", "delete"].includes(action)) throw new Error("Unknown preview action");
  const project = uuid(config.projectUuid), environmentUuid = uuid(config.environmentUuid), server = uuid(config.serverUuid);
  const guard = () => assertCurrent({ github, identity, sha, deleting: action === "delete" });
  await guard();
  const environment = await coolify(`/api/v1/projects/${project}/${environmentUuid}`);
  if (environment?.uuid !== environmentUuid || !Array.isArray(environment.services)) throw new Error("Unexpected preview environment");
  const matches = environment.services.filter(resource => resource.name === identity.name);
  if (matches.length > 1) throw new Error("Duplicate preview resources require inspection");
  const existing = matches[0];
  if (existing && !isOwned(existing, identity, environmentUuid)) throw new Error("Preview ownership mismatch");
  if (action === "delete") {
    if (!existing) return { outcome: "absent", url: identity.url };
    const id = uuid(existing.uuid);
    const current = await coolify(`/api/v1/services/${id}`, { missing: true });
    if (!current) return { outcome: "absent", url: identity.url };
    if (!isOwned(current, identity, environmentUuid) || current.server_status !== true) throw new Error("Preview ownership changed or server unavailable; cleanup refused");
    await guard();
    const deletion = await coolify(`/api/v1/services/${id}?delete_configurations=true&delete_volumes=false&delete_connected_networks=false&docker_cleanup=false`, { method: "DELETE", missing: true });
    if (deletion !== null && deletion.message !== "Service deletion request queued.") throw new Error("Runtime cleanup was not queued");
    return { outcome: deletion === null ? "absent" : "cleanup queued", url: identity.url };
  }
  const shared = await coolify(`/api/v1/projects/${project}/environments/${environmentUuid}/envs`);
  if (!Array.isArray(shared) || SHARED_KEYS.some(key => !shared.some(item => item.key === key))) throw new Error("Preview CMS variables are missing in Coolify");
  const payload = {
    name: identity.name, description: ownership(identity, environmentUuid), instant_deploy: false,
    docker_compose_raw: Buffer.from(JSON.stringify(previewCompose(identity, sha, digest))).toString("base64"),
    urls: [{ name: "app", url: `http://${identity.hostname}:3000` }], is_container_label_escape_enabled: true,
  };
  await guard();
  let id;
  if (existing) {
    id = uuid(existing.uuid);
    if (!isOwned(await coolify(`/api/v1/services/${id}`), identity, environmentUuid)) throw new Error("Preview ownership changed; update refused");
    await guard();
    await coolify(`/api/v1/services/${id}`, { method: "PATCH", body: { ...payload, connect_to_docker_network: false } });
  } else {
    id = uuid((await coolify("/api/v1/services", { method: "POST", body: { ...payload, project_uuid: project, environment_uuid: environmentUuid, server_uuid: server } }))?.uuid);
  }
  await guard();
  // PATCH dispatches a deployment for running services too. /start rejects them.
  await coolify(`/api/v1/services/${id}`, { method: "PATCH", body: { instant_deploy: true } });
  let firstHealthy = null;
  // Always verify a dispatched deployment, even when a later push supersedes it.
  for (let attempt = 0; attempt < 90; attempt++) {
    try {
      const response = await fetchImpl(`${identity.url}/?preview-check=${sha}-${now()}`, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(8_000) });
      const ok = response.ok && response.headers.get("x-preview-commit") === sha && /noindex/.test(response.headers.get("x-robots-tag") ?? "") && (await response.text()).includes("<html");
      if (ok) {
        firstHealthy ??= now();
        if (now() - firstHealthy >= 8_000) return { outcome: existing ? "updated" : "created", url: identity.url, uuid: id, sha };
      } else firstHealthy = null;
    } catch { firstHealthy = null; }
    await wait(5_000);
  }
  throw new Error("Preview did not become ready at the expected commit; inspect Coolify logs");
}

export async function main(env = process.env) {
  const identity = previewIdentity(env.GITHUB_REPOSITORY, env.PREVIEW_BRANCH);
  if (env.PREVIEW_ACTION === "identity") {
    if (!/^[a-f0-9]{40}$/.test(env.PREVIEW_SHA ?? "")) throw new Error("Invalid commit SHA");
    if (env.GITHUB_OUTPUT) appendFileSync(env.GITHUB_OUTPUT, `identity=${identity.hash}\nurl=${identity.url}\napp_image=furki4/the-portfolio:preview-${identity.hash}-${env.PREVIEW_SHA}\n`);
    console.log(identity.url);
    return;
  }
  try {
    const result = await runLifecycle({ action: env.PREVIEW_ACTION, identity, sha: env.PREVIEW_SHA, digest: env.PREVIEW_IMAGE_DIGEST,
      config: { projectUuid: env.COOLIFY_PROJECT_UUID, environmentUuid: env.COOLIFY_PREVIEW_ENVIRONMENT_UUID, serverUuid: env.COOLIFY_SERVER_UUID },
      coolify: jsonClient({ baseUrl: env.COOLIFY_URL, token: env.COOLIFY_TOKEN, service: "Coolify" }),
      github: jsonClient({ baseUrl: "https://api.github.com", token: env.GITHUB_TOKEN, service: "GitHub" }),
    });
    console.log(`Preview ${result.outcome}: ${result.url}`);
    if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, `Preview ${result.outcome}: [Open on your phone](${result.url})\n\nCommit: \`${result.sha ?? "deleted branch"}\`\n`);
  } catch (error) {
    if (error instanceof StaleRun) { console.log(error.message); return; }
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
