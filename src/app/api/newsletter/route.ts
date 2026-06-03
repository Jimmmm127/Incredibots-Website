import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "newsletter.json");

function readNewsletter() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Auth check — ?check=1 with the admin key header returns 200/401 without touching data.
  const isCheck = req.nextUrl.searchParams.get("check") === "1";
  if (isCheck) {
    const adminKey = process.env.NEWSLETTER_ADMIN_KEY ?? "incredibots-admin";
    const authHeader = req.headers.get("x-admin-key");
    if (authHeader !== adminKey) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  }

  const data = readNewsletter();
  if (!data) {
    return NextResponse.json({ error: "No newsletter data found." }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminKey = process.env.NEWSLETTER_ADMIN_KEY ?? "incredibots-admin";
  const authHeader = req.headers.get("x-admin-key");
  if (authHeader !== adminKey) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { id, title, date, preview, body: newsletterBody } = body;
    if (!id || !title || !date || !preview || !newsletterBody) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const payload = {
      active: body.active ?? true,
      id: String(id).trim(),
      title: String(title).trim(),
      date: String(date).trim(),
      preview: String(preview).trim(),
      body: String(newsletterBody).trim(),
      cta: body.cta ?? { label: "Contact us", href: "#contact" },
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), "utf-8");
    return NextResponse.json({ success: true, newsletter: payload });
  } catch (err) {
    console.error("[newsletter POST]", err);
    return NextResponse.json({ error: "Failed to save newsletter." }, { status: 500 });
  }
}
