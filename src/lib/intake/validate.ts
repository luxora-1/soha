import { isServedState, usStates } from "@/config/states";
import type { IntakeSubmission } from "./types";

export type IntakeErrors = Partial<Record<Exclude<keyof IntakeSubmission, "idempotencyKey">, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const KEY = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * Minimum age to start a consult.
 * LEGAL_PLACEHOLDER: developer assumption (adults only). Confirm the
 * eligibility rule with counsel and the medical director before launch.
 */
const MIN_AGE = 18;

/** Parses YYYY-MM-DD strictly: rejects impossible dates like 2023-02-30. */
function parseIsoDate(value: string): Date | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const roundTrips =
    date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
  return roundTrips ? date : null;
}

/** Whole years between a UTC date of birth and now, computed in UTC throughout. */
function ageInYears(dob: Date, now = new Date()): number {
  let age = now.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    now.getUTCMonth() < dob.getUTCMonth() ||
    (now.getUTCMonth() === dob.getUTCMonth() && now.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

/**
 * Validates a raw submission. Shared by the client form (instant feedback)
 * and the API route (authoritative). Returns cleaned data or field errors.
 */
export function validateIntake(
  input: Partial<Record<keyof IntakeSubmission, unknown>>,
): { data: IntakeSubmission; errors: null } | { data: null; errors: IntakeErrors } {
  const errors: IntakeErrors = {};

  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 120) errors.name = "That name is too long.";

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Please enter a valid email address.";

  const dateOfBirth = typeof input.dateOfBirth === "string" ? input.dateOfBirth.trim() : "";
  const dob = parseIsoDate(dateOfBirth);
  if (!dob) {
    errors.dateOfBirth = "Please enter your date of birth.";
  } else {
    const now = new Date();
    if (dob.getTime() > now.getTime()) errors.dateOfBirth = "Date of birth can't be in the future.";
    else if (ageInYears(dob, now) < MIN_AGE)
      errors.dateOfBirth = `You must be ${MIN_AGE} or older to start a consult.`;
    else if (ageInYears(dob, now) > 120) errors.dateOfBirth = "Please check your date of birth.";
  }

  const state = typeof input.state === "string" ? input.state.trim().toUpperCase() : "";
  if (!usStates.some((s) => s.code === state)) errors.state = "Please choose your state.";
  else if (!isServedState(state)) errors.state = "Soha isn't available in your state yet.";

  const idempotencyKey =
    typeof input.idempotencyKey === "string" && KEY.test(input.idempotencyKey)
      ? input.idempotencyKey
      : undefined;

  if (Object.keys(errors).length) return { data: null, errors };
  return { data: { name, email, dateOfBirth, state, idempotencyKey }, errors: null };
}
