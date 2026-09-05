import { NextResponse } from "next/server";
import { validateWaitlist, type WaitlistReceipt, type WaitlistSubmission } from "@/lib/waitlist";

export const runtime = "nodejs";

/** An email plus a handful of short strings; anything larger is not a form post. */
const MAX_BODY_BYTES = 8 * 1024;

/**
 * POST /api/waitlist — pre-launch stub.
 *
 * Validates the landing page's waitlist submission and hands it to
 * `deliver()`, which today logs a masked line and returns a synthetic
 * receipt. Replace the body of `deliver()` with the call to your email
 * provider or CRM; the form and the client-side handler
 * (src/lib/waitlist/submit.ts) stay unchanged.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, error: "Send JSON." }, { status: 415 });
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const result = validateWaitlist(body as Record<string, unknown>);
  if (result.errors) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  try {
    const receipt = await deliver(result.data, {
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
    return NextResponse.json({ ok: true, receipt }, { status: 201 });
  } catch (error) {
    console.error("[waitlist] delivery error", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your email just now. Please try again." },
      { status: 502 },
    );
  }
}

/*
 * ─── DELIVERY SEAM ──────────────────────────────────────────────────────────
 * Replace this function's body with the call to your list provider (email
 * platform, CRM, spreadsheet webhook). Keep the return shape: the form shows
 * its confirmation once a receipt comes back.
 * ────────────────────────────────────────────────────────────────────────────
 */
async function deliver(
  submission: WaitlistSubmission,
  context: { submittedAt: string; userAgent?: string },
): Promise<WaitlistReceipt> {
  const id = `wl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  // Never log the address in full, even pre-launch.
  console.info("[waitlist:stub]", {
    id,
    email: maskEmail(submission.email),
    page: submission.page,
    location: submission.location,
    utm: submission.utm,
    referrer: submission.referrer ?? null,
    idempotencyKey: submission.idempotencyKey ?? null,
    submittedAt: context.submittedAt,
  });
  return { id, receivedAt: new Date().toISOString() };
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "•••";
  return `${user.slice(0, 1)}•••@${domain}`;
}
