import { NextResponse } from "next/server";

export const runtime = "nodejs";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!uuidPattern.test(id)) {
    return NextResponse.json({ error: "Invalid asset identifier." }, { status: 400 });
  }

  const directusUrl = process.env.DIRECTUS_URL?.replace(/\/$/, "");
  const assetToken = process.env.DIRECTUS_ASSET_TOKEN;
  if (!directusUrl || !assetToken) {
    return NextResponse.json(
      { error: "Asset delivery is not configured." },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch(`${directusUrl}/assets/${id}`, {
      headers: { authorization: `Bearer ${assetToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json({ error: "Asset unavailable." }, { status: 502 });
  }
  if (!response.ok || !response.body) {
    return NextResponse.json(
      { error: response.status === 404 ? "Asset not found." : "Asset unavailable." },
      { status: response.status === 404 ? 404 : 502 },
    );
  }

  const headers = new Headers({
    "cache-control": "private, no-store, max-age=0",
    "content-type": response.headers.get("content-type") ?? "application/octet-stream",
    "x-content-type-options": "nosniff",
  });
  const contentLength = response.headers.get("content-length");
  if (contentLength) headers.set("content-length", contentLength);
  const contentDisposition = response.headers.get("content-disposition");
  if (contentDisposition) headers.set("content-disposition", contentDisposition);
  return new Response(response.body, { status: 200, headers });
}
