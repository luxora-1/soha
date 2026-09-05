import { quizQuestions, type QuizAnswers } from "@/content/quiz";
import { sanitizeUtm } from "@/lib/utm";
import type { WaitlistFieldErrors, WaitlistSubmission } from "./types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KEY = /^[A-Za-z0-9_-]{8,64}$/;
const SLUG = /^[a-z0-9-]{1,64}$/;

export const WAITLIST_EMAIL_ERROR = "Please enter a valid email address.";

/** Keeps only known questions and known option keys, so nothing arbitrary is stored. */
export function sanitizeQuiz(input: unknown): QuizAnswers | undefined {
  if (typeof input !== "object" || input === null) return undefined;
  const answers: QuizAnswers = {};
  for (const question of quizQuestions) {
    const raw = (input as Record<string, unknown>)[question.key];
    if (!Array.isArray(raw)) continue;
    const allowed = new Set<string>(question.options.map((o) => o.key));
    const chosen = raw.filter((v): v is string => typeof v === "string" && allowed.has(v)).slice(0, question.options.length);
    if (chosen.length) answers[question.key] = [...new Set(chosen)];
  }
  return Object.keys(answers).length ? answers : undefined;
}

/**
 * Validates a raw submission. Shared by the form (instant feedback) and the
 * API route (authoritative). Returns cleaned data or field errors.
 */
export function validateWaitlist(
  input: Partial<Record<keyof WaitlistSubmission, unknown>>,
): { data: WaitlistSubmission; errors: null } | { data: null; errors: WaitlistFieldErrors } {
  const errors: WaitlistFieldErrors = {};

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) errors.email = WAITLIST_EMAIL_ERROR;

  const page = typeof input.page === "string" && SLUG.test(input.page) ? input.page : "unknown";
  const location = typeof input.location === "string" && SLUG.test(input.location) ? input.location : "unknown";
  const referrer =
    typeof input.referrer === "string" && input.referrer.length <= 2048 ? input.referrer : undefined;
  const idempotencyKey =
    typeof input.idempotencyKey === "string" && KEY.test(input.idempotencyKey) ? input.idempotencyKey : undefined;

  if (Object.keys(errors).length) return { data: null, errors };
  return {
    data: { email, page, location, utm: sanitizeUtm(input.utm), referrer, idempotencyKey, quiz: sanitizeQuiz(input.quiz) },
    errors: null,
  };
}
