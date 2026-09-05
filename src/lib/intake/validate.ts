import { isServedState, usStates } from "@/config/states";
import type { IntakeSubmission } from "./types";

export type IntakeErrors = Partial<Record<keyof IntakeSubmission, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates a raw submission. Shared by the client form (instant feedback)
 * and the API route (authoritative). Returns cleaned data or field errors.
 */
export function validateIntake(
  input: Partial<Record<keyof IntakeSubmission, unknown>>,
): { data: IntakeSubmission; errors: null } | { data: null; errors: IntakeErrors } {
  const errors: IntakeErrors = {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 120) errors.name = "That name is too long.";

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";

  const dateOfBirth = typeof input.dateOfBirth === "string" ? input.dateOfBirth.trim() : "";
  if (!ISO_DATE.test(dateOfBirth) || Number.isNaN(Date.parse(dateOfBirth))) {
    errors.dateOfBirth = "Please enter your date of birth.";
  } else {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear() - (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
    if (dob > now) errors.dateOfBirth = "Date of birth can't be in the future.";
    else if (age < 18) errors.dateOfBirth = "You must be 18 or older to start a consult.";
    else if (age > 120) errors.dateOfBirth = "Please check your date of birth.";
  }

  const state = typeof input.state === "string" ? input.state.trim().toUpperCase() : "";
  if (!usStates.some((s) => s.code === state)) errors.state = "Please choose your state.";
  else if (!isServedState(state)) errors.state = "Soha isn't available in your state yet.";

  if (Object.keys(errors).length) return { data: null, errors };
  return { data: { name, email, dateOfBirth, state }, errors: null };
}
