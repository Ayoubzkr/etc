import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

/** Best-effort, per-instance rate limit (5 messages / 10 min / IP). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { message: "Trop de messages envoyés. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Certains champs sont invalides.", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Honeypot filled → pretend success, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set — message not sent.");
    return NextResponse.json(
      { message: "Le formulaire n'est pas encore relié à la messagerie de l'entreprise." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "ETC SAT MAROC — Site web <onboarding@resend.dev>";
  const rows: [string, string][] = [
    ["Nom", data.name],
    ["Société", data.company],
    ["E-mail", data.email],
    ["Téléphone", data.phone || "—"],
    ["Objet", data.subject],
  ];
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#20272D;max-width:640px">
<h2 style="color:#172B3A;border-bottom:2px solid #E5252A;padding-bottom:8px">Nouvelle demande — site web</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5F6B73;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;background:#F5F6F7;padding:16px;margin-top:16px">${escapeHtml(data.message)}</p>
<p style="color:#7A858D;font-size:12px">Consentement au traitement de la demande : oui.</p></div>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${data.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Site web] ${data.subject} — ${data.company}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ message: "Le service d'envoi est momentanément indisponible." }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] network error", error);
    return NextResponse.json({ message: "Le service d'envoi est momentanément indisponible." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
