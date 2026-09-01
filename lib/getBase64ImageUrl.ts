import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { getPlaiceholder } from "plaiceholder";

const fallback =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5Ij48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iIzExMTgyNyIvPjwvc3ZnPg==";

export const getBase64 = cache(async (imgPath: string) => {
  try {
    let imageBuffer: Buffer;
    const directusAsset = imgPath.match(/^\/api\/assets\/([0-9a-f-]{36})$/i);
    if (directusAsset) {
      const directusUrl = (process.env.DIRECTUS_URL ?? "http://127.0.0.1:8055").replace(
        /\/$/,
        "",
      );
      const headers = new Headers();
      if (process.env.DIRECTUS_ASSET_TOKEN) {
        headers.set("authorization", `Bearer ${process.env.DIRECTUS_ASSET_TOKEN}`);
      }
      const response = await fetch(`${directusUrl}/assets/${directusAsset[1]}`, {
        headers,
        signal: AbortSignal.timeout(5_000),
      });
      if (!response.ok) throw new Error(`Directus image failed: ${response.status}`);
      imageBuffer = Buffer.from(await response.arrayBuffer());
    } else if (/^https?:\/\//.test(imgPath)) {
      const response = await fetch(imgPath, { signal: AbortSignal.timeout(5_000) });
      if (!response.ok) throw new Error(`Remote image failed: ${response.status}`);
      imageBuffer = Buffer.from(await response.arrayBuffer());
    } else {
      imageBuffer = await fs.readFile(
        path.join(process.cwd(), "public", imgPath.replace(/^\//, "")),
      );
    }
    const { base64 } = await getPlaiceholder(imageBuffer);
    return base64;
  } catch {
    return fallback;
  }
});
