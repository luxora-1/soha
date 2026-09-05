import type { WaitlistFieldErrors, WaitlistReceipt, WaitlistResult, WaitlistSubmission } from "./types";

/*
 * ─── WAITLIST SUBMIT HANDLER ────────────────────────────────────────────────
 *
 * This is the one function to point at a real endpoint.
 *
 * Today it POSTs JSON to the stub route at /api/waitlist, which validates,
 * logs a masked line, and returns a receipt — so the form works end to end
 * in development. To go live, either
 *
 *   (a) keep this file and wire `deliver()` in src/app/api/waitlist/route.ts
 *       to your email provider or CRM (recommended: the API key stays on the
 *       server), or
 *   (b) change WAITLIST_ENDPOINT below to the provider's URL and adapt the
 *       request body in `submitWaitlist` to its schema.
 *
 * Nothing in the form component needs to change either way.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const WAITLIST_ENDPOINT = "/api/waitlist";

export async function submitWaitlist(submission: WaitlistSubmission): Promise<WaitlistResult> {
  try {
    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      receipt?: WaitlistReceipt;
      errors?: WaitlistFieldErrors;
      error?: string;
    };
    if (response.ok && payload.ok && payload.receipt) {
      return { ok: true, receipt: payload.receipt };
    }
    if (payload.errors && Object.keys(payload.errors).length) {
      return { ok: false, error: "Please check the highlighted field.", fieldErrors: payload.errors };
    }
    return { ok: false, error: payload.error ?? "Something went wrong on our side. Please try again." };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}
