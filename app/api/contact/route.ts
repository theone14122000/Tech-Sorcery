import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { contactSchema, type ContactInput } from "@/lib/validation";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildMessage(data: ContactInput) {
  const subject = `[Tech Sorcery] New enquiry — ${data.package}`;
  const text = [
    "New enquiry from the Tech Sorcery website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Package: ${data.package}`,
    `Budget: ${data.budget}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Package", data.package],
    ["Budget", data.budget],
  ];

  const html = [
    `<div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#05060a;padding:24px;color:#eaeefb">`,
    `<div style="max-width:560px;margin:0 auto;background:#0a0b12;border:1px solid #1a1d2c;border-radius:16px;padding:24px">`,
    `<h2 style="margin:0 0 16px;font-size:18px;color:#22d3ee;letter-spacing:.08em;text-transform:uppercase">New enquiry</h2>`,
    `<table style="width:100%;border-collapse:collapse;font-size:14px">`,
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 0;color:#838aa3;width:110px">${label}</td><td style="padding:6px 0;color:#eaeefb">${escapeHtml(value)}</td></tr>`,
      )
      .join(""),
    `</table>`,
    `<p style="margin:18px 0 6px;color:#838aa3;font-size:13px">Message</p>`,
    `<p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#b4bad0">${escapeHtml(data.message)}</p>`,
    `<p style="margin:22px 0 0;font-size:12px;color:#5e657d">Sent from the Tech Sorcery website — reply directly to reach the sender.</p>`,
    `</div></div>`,
  ].join("");

  return { subject, text, html };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Normalise so the honeypot is always present even if a client omits it.
  const body =
    typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};
  const parsed = contactSchema.safeParse({ website: "", ...body });
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check the form fields.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: bots fill it in. Pretend success, send nothing.
  if (data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_EMAIL ?? site.email;
  const replyTo = process.env.CONTACT_REPLY_TO || data.email;
  const { subject, text, html } = buildMessage(data);
  const host = process.env.SMTP_HOST;
  const resendKey = process.env.RESEND_API_KEY;

  if (host) {
    try {
      const transport = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT ?? "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });

      await transport.sendMail({
        from: process.env.SMTP_FROM ?? `Tech Sorcery <${process.env.SMTP_USER ?? to}>`,
        to,
        replyTo,
        subject,
        text,
        html,
      });

      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("[contact] SMTP send failed:", error);
      return NextResponse.json(
        { ok: false, fallback: true, error: "Email delivery failed." },
        { status: 502 },
      );
    }
  }

  if (resendKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL ?? `Tech Sorcery <onboarding@resend.dev>`,
          to: [to],
          reply_to: replyTo,
          subject,
          text,
          html,
        }),
      });

      if (!response.ok) throw new Error(`Resend responded ${response.status}`);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("[contact] Resend send failed:", error);
      return NextResponse.json(
        { ok: false, fallback: true, error: "Email delivery failed." },
        { status: 502 },
      );
    }
  }

  // No transport configured — hand the message back so the client can
  // open WhatsApp / mailto instead of silently dropping the enquiry.
  return NextResponse.json({ ok: false, fallback: true });
}
