export class ApiError extends Error {
  constructor(service, status) {
    // API validation responses can contain private environment values.
    super(`${service} API request failed (HTTP ${status})`);
    this.status = status;
  }
}

export function jsonClient({ baseUrl, token, service, fetchImpl = fetch }) {
  const base = new URL(baseUrl);
  if (base.protocol !== "https:" || base.username || base.password || base.search || base.hash || !["", "/"].includes(base.pathname)) {
    throw new Error(`${service} requires an HTTPS origin`);
  }
  if (!token) throw new Error(`${service} API token is missing`);
  return async (path, { method = "GET", body, missing = false } = {}) => {
    if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Invalid API path");
    let response;
    try {
      response = await fetchImpl(`${base.origin}${path}`, {
        method, redirect: "error", signal: AbortSignal.timeout(30_000),
        headers: { accept: "application/json", authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } catch { throw new Error(`${service} API is unreachable or timed out`); }
    if (missing && response.status === 404) return null;
    if (!response.ok) throw new ApiError(service, response.status);
    if (response.status === 204) return null;
    try { return await response.json(); } catch { throw new Error(`${service} returned invalid JSON`); }
  };
}
