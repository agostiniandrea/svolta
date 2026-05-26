import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");

  if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type: string = body._type ?? "";

  if (type === "dish" || type === "menu") {
    revalidateTag("menu");
  }
  if (type === "settings") {
    revalidateTag("settings");
  }

  return NextResponse.json({ revalidated: true, type });
}
