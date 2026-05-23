import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, interest, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // No API key configured — tell client to fall back to mailto
      return NextResponse.json({ error: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      // Free Resend accounts send from their onboarding domain.
      // Once you verify your own domain, swap this to: "Incredibots <hello@yourdomain.com>"
      from: "Incredibots <onboarding@resend.dev>",
      to: ["incredibotsftc@gmail.com"],
      replyTo: email,
      subject: `[Incredibots] ${interest} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Inter,-apple-system,sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#e63946,#3d9be9);padding:28px 32px">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.75)">
                      FTC #26336 — Incredibots
                    </p>
                    <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em">
                      New ${interest} Inquiry
                    </h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;margin-bottom:24px">
                      <tr style="background:#fafafa">
                        <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#666;letter-spacing:0.08em;text-transform:uppercase;width:100px;border-bottom:1px solid #e8e8e8">From</td>
                        <td style="padding:12px 16px;font-size:15px;color:#111;border-bottom:1px solid #e8e8e8">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#666;letter-spacing:0.08em;text-transform:uppercase;border-bottom:1px solid #e8e8e8">Email</td>
                        <td style="padding:12px 16px;border-bottom:1px solid #e8e8e8">
                          <a href="mailto:${email}" style="color:#e63946;text-decoration:none;font-size:15px">${email}</a>
                        </td>
                      </tr>
                      <tr style="background:#fafafa">
                        <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#666;letter-spacing:0.08em;text-transform:uppercase">Interest</td>
                        <td style="padding:12px 16px;font-size:15px;color:#111">${interest}</td>
                      </tr>
                    </table>
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#666;letter-spacing:0.08em;text-transform:uppercase">Message</p>
                    <div style="background:#f8f8f8;border-left:3px solid #e63946;border-radius:0 8px 8px 0;padding:16px 20px">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#333">${message.replace(/\n/g, "<br/>")}</p>
                    </div>
                    <p style="margin:24px 0 0;font-size:13px;color:#999;text-align:center">
                      Hit Reply to respond directly to ${name}.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#f8f8f8;padding:16px 32px;border-top:1px solid #e8e8e8">
                    <p style="margin:0;font-size:12px;color:#999;text-align:center">
                      Incredibots · FTC Team #26336 · Sammamish, WA
                    </p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "SEND_FAILED" }, { status: 500 });
  }
}
