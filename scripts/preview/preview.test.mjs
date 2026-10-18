import assert from "node:assert/strict";
import test from "node:test";
import { jsonClient } from "./client.mjs";
import { assertCurrent, isOwned, ownership, previewCompose, previewIdentity, runLifecycle, SHARED_KEYS, StaleRun } from "./lifecycle.mjs";

const sha = "a".repeat(40), digest = `sha256:${"b".repeat(64)}`;
const identity = previewIdentity("4Furki4/the-portfolio", "feat/phone-preview");
const config = { projectUuid: "portfolio-project", environmentUuid: "previews", serverUuid: "pi" };

function fixture({ existing, branchExists = true, head = sha, failFetch = false, fetchImpl, mutate } = {}) {
  const calls = [];
  let clock = 0;
  const resource = existing === true ? { uuid: "owned", name: identity.name, description: ownership(identity, "previews"), server_status: true } : existing;
  const coolify = async (path, options = {}) => {
    calls.push({ path, ...options });
    const overridden = mutate?.(path, options);
    if (overridden !== undefined) return overridden;
    if (path === "/api/v1/projects/portfolio-project/previews") return { uuid: "previews", services: resource ? [resource] : [] };
    if (path.endsWith("/envs")) return SHARED_KEYS.map(key => ({ key }));
    if (path === "/api/v1/services" && options.method === "POST") return { uuid: "created" };
    if (path.includes("delete_configurations")) return { message: "Service deletion request queued." };
    if (path === "/api/v1/services/owned" && !options.method) return resource;
    return { uuid: "created" };
  };
  const github = async () => branchExists ? { object: { sha: head } } : null;
  return { calls, run: overrides => runLifecycle({ action: "deploy", identity, sha, digest, config, coolify, github,
    now: () => clock, wait: async ms => { clock += ms; },
    fetchImpl: fetchImpl ?? (async () => {
      if (failFetch) throw new Error("unreachable");
      return new Response("<html>Portfolio</html>", { headers: { "x-preview-commit": sha, "x-robots-tag": "noindex, nofollow" } });
    }), ...overrides,
  }) };
}

test("branch URLs are stable, case-sensitive, collision-resistant, and fit DNS", () => {
  const a = previewIdentity("4Furki4/the-portfolio", "feature/room");
  assert.deepEqual(a, previewIdentity("4furki4/the-portfolio", "feature/room"));
  assert.notEqual(a.url, previewIdentity("4Furki4/the-portfolio", "feature-room").url);
  assert.notEqual(a.url, previewIdentity("4Furki4/the-portfolio", "Feature/room").url);
  assert.ok(previewIdentity("4Furki4/the-portfolio", "z".repeat(200)).hostname.split(".")[0].length <= 63);
  for (const branch of ["main", "MAIN", "develop", "", "bad\nbranch"]) assert.throws(() => previewIdentity("4Furki4/the-portfolio", branch));
  assert.throws(() => previewIdentity("another/repo", "feature"));
});

test("preview uses an immutable image and a separate CMS gateway without host ports", () => {
  const compose = previewCompose(identity, sha, digest), app = compose.services.app;
  assert.equal(app.image, `furki4/the-portfolio@${digest}`);
  assert.equal(app.ports, undefined);
  assert.equal(app.volumes, undefined);
  assert.equal(compose.networks.cms.name, "portfolio-preview-cms");
  assert.ok(app.environment.REVALIDATION_SECRET.includes("PREVIEW_REVALIDATION_SECRET"));
  assert.ok(!("DIRECTUS_TOKEN" in app.environment));
  assert.equal(app.labels["com.centurylinklabs.watchtower.enable"], "false");
  assert.throws(() => previewCompose(identity, sha, "latest"));
  assert.throws(() => previewCompose(identity, "abc", digest));
});

test("ownership includes repository, exact branch, environment, and manager", () => {
  const resource = { name: identity.name, description: ownership(identity, "previews") };
  assert.ok(isOwned(resource, identity, "previews"));
  assert.ok(!isOwned(resource, identity, "production"));
  assert.ok(!isOwned({ ...resource, description: "foreign" }, identity, "previews"));
});

test("new previews are created then deployed and checked repeatedly", async () => {
  const f = fixture();
  const result = await f.run();
  assert.equal(result.outcome, "created");
  const creation = f.calls.find(c => c.path === "/api/v1/services");
  assert.equal(creation.body.environment_uuid, "previews");
  assert.equal(creation.body.instant_deploy, false);
  assert.equal(JSON.parse(Buffer.from(creation.body.docker_compose_raw, "base64")).services.app.image, `furki4/the-portfolio@${digest}`);
  assert.ok(f.calls.some(c => c.body?.instant_deploy === true));
});

test("updates preserve the resource and use deployment dispatch for running services", async () => {
  const f = fixture({ existing: true });
  assert.equal((await f.run()).outcome, "updated");
  assert.ok(!f.calls.some(c => c.method === "POST"));
  assert.ok(f.calls.some(c => c.body?.connect_to_docker_network === false));
});

test("stale pushes and deleted branches cannot create resources", async () => {
  for (const opts of [{ head: "c".repeat(40) }, { branchExists: false }]) {
    const f = fixture(opts);
    await assert.rejects(f.run(), StaleRun);
    assert.equal(f.calls.length, 0);
  }
});

test("foreign resources and missing preview variables cannot be mutated", async () => {
  for (const opts of [{ existing: { name: identity.name, description: "foreign" } }, { mutate: p => p.endsWith("/envs") ? [] : undefined }]) {
    const f = fixture(opts);
    await assert.rejects(f.run(), /ownership|variables/);
    assert.ok(!f.calls.some(c => c.method));
  }
});

test("cleanup refuses a recreated branch and preserves shared networks and volumes", async () => {
  const live = fixture({ existing: true });
  await assert.rejects(live.run({ action: "delete" }), StaleRun);
  const gone = fixture({ existing: true, branchExists: false });
  assert.equal((await gone.run({ action: "delete" })).outcome, "cleanup queued");
  assert.ok(gone.calls.some(c => c.method === "DELETE" && c.path.includes("delete_volumes=false&delete_connected_networks=false")));
});

test("a successful old commit or missing noindex header cannot pass readiness", async () => {
  for (const headers of [{ "x-preview-commit": "c".repeat(40), "x-robots-tag": "noindex" }, { "x-preview-commit": sha }]) {
    const f = fixture({ fetchImpl: async () => new Response("<html></html>", { headers }) });
    await assert.rejects(f.run(), /did not become ready/);
  }
});

test("verification finishes after dispatch even when the branch head changes", async () => {
  const f = fixture();
  let reads = 0;
  const github = async () => ({ object: { sha: ++reads <= 3 ? sha : "c".repeat(40) } });
  assert.equal((await f.run({ github })).sha, sha);
  assert.equal(reads, 3);
});

test("unreachable previews time out instead of claiming deployment success", async () => {
  await assert.rejects(fixture({ failFetch: true }).run(), /did not become ready/);
});

test("API requests reject redirects and never echo private error bodies", async () => {
  const client = jsonClient({ baseUrl: "https://coolify.example", token: "secret", service: "Coolify", fetchImpl: async (_url, options) => {
    assert.equal(options.redirect, "error");
    return new Response('private token value', { status: 422 });
  } });
  await assert.rejects(client("/api/v1/services"), error => error.message === "Coolify API request failed (HTTP 422)");
  assert.throws(() => jsonClient({ baseUrl: "http://unsafe", token: "secret", service: "Coolify" }));
  await assert.rejects(client("//elsewhere.example"), /Invalid API path/);
});

test("an absent branch is required for cleanup even without an existing preview", async () => {
  await assert.rejects(assertCurrent({ identity, deleting: true, github: async () => ({ object: { sha } }) }), StaleRun);
});
