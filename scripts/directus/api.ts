import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { z } from "zod";

const readEnvironmentFile = (filename: string) => {
  try {
    return Object.fromEntries(
      readFileSync(filename, "utf8")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const separator = line.indexOf("=");
          return [
            line.slice(0, separator),
            line.slice(separator + 1).replace(/^(["'])(.*)\1$/, "$2"),
          ];
        }),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
};

const fileEnvironment = readEnvironmentFile(
  process.env.DIRECTUS_ENV_FILE ?? ".env.directus.local",
);
const directusEnvironment = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) =>
      key.startsWith("DIRECTUS_") ||
      key.startsWith("PORTFOLIO_REVALIDATE_") ||
      key === "REVALIDATION_SECRET",
  ),
);

const configurationSchema = z.object({
  DIRECTUS_URL: z.url().default("http://localhost:8055"),
  DIRECTUS_PUBLIC_URL: z.url().default("http://localhost:8055"),
  DIRECTUS_ADMIN_EMAIL: z.email(),
  DIRECTUS_ADMIN_PASSWORD: z.string().min(8),
  DIRECTUS_ASSET_TOKEN: z.string().min(32),
});

export const configuration = configurationSchema.parse({
  ...fileEnvironment,
  ...directusEnvironment,
  DIRECTUS_URL:
    directusEnvironment.DIRECTUS_URL ??
    fileEnvironment.DIRECTUS_URL ??
    "http://localhost:8055",
});

export const directusUrl = configuration.DIRECTUS_URL.replace(/\/$/, "");
export const directusPublicUrl = configuration.DIRECTUS_PUBLIC_URL.replace(
  /\/$/,
  "",
);

let accessToken: string | undefined;

const login = async () => {
  if (accessToken) return accessToken;
  const response = await fetch(`${directusUrl}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: configuration.DIRECTUS_ADMIN_EMAIL,
      password: configuration.DIRECTUS_ADMIN_PASSWORD,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Directus login failed (${response.status}): ${await response.text()}`,
    );
  }
  const payload = (await response.json()) as {
    data: { access_token: string };
  };
  accessToken = payload.data.access_token;
  return accessToken;
};

export const request = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<T> => {
  const token = await login();
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  if (!(init.body instanceof FormData)) headers.set("content-type", "application/json");

  const response = await fetch(`${directusUrl}${path}`, { ...init, headers });
  if (!response.ok) {
    throw new Error(
      `${init.method ?? "GET"} ${path} failed (${response.status}): ${await response.text()}`,
    );
  }
  if (response.status === 204) return undefined as T;
  const payload = (await response.json()) as { data: T };
  return payload.data;
};

export const publicRequest = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${directusUrl}${path}`);
  if (!response.ok) {
    throw new Error(
      `Public GET ${path} failed (${response.status}): ${await response.text()}`,
    );
  }
  return ((await response.json()) as { data: T }).data;
};

export const stableUuid = (key: string) => {
  const bytes = createHash("sha256")
    .update(`portfolio-directus:${key}`)
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
