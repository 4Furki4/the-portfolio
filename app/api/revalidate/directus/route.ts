import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const secretsMatch = (provided: string, expected: string) => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

export async function POST(request: Request) {
  const expectedSecret = process.env.REVALIDATION_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  const providedSecret = request.headers.get("x-revalidation-secret") ?? "";
  if (!secretsMatch(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  revalidateTag("portfolio-content", "max");
  revalidatePath("/[locale]", "layout");
  return NextResponse.json({ revalidated: true, tag: "portfolio-content" });
}
