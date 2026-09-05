import type { UtmParams } from "@/lib/utm";

/** What the waitlist form sends. The contract between the form, the API route, and any list provider. */
export type WaitlistSubmission = {
  email: string;
  /** Which landing page the signup came from, e.g. "combination-cream". */
  page: string;
  /** Where on the page the form was submitted: "hero" | "pricing" | "closing" | … */
  location: string;
  utm: UtmParams;
  /** document.referrer at submission, if any. */
  referrer?: string;
  /** Client-generated key, stable across retries of the same submission, for de-duplication downstream. */
  idempotencyKey?: string;
};

export type WaitlistReceipt = {
  id: string;
  receivedAt: string;
};

export type WaitlistFieldErrors = { email?: string };

export type WaitlistResult =
  | { ok: true; receipt: WaitlistReceipt }
  | { ok: false; error: string; fieldErrors?: WaitlistFieldErrors };
