"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { usStates } from "@/config/states";
import { validateIntake } from "@/lib/intake/validate";
import type { IntakeErrors } from "@/lib/intake/validate";
import type { IntakeSubmission } from "@/lib/intake/types";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

type IntakeFormProps = {
  submitLabel: string;
  dobHint: string;
  privacyNote: string;
  privacyLinkLabel: string;
  privacyNoteTrail: string;
  confirmationHeadline: string;
};

type Values = Omit<IntakeSubmission, "idempotencyKey">;

const fieldClass =
  "block w-full min-h-[3.25rem] rounded-2xl border border-ink-muted bg-base px-4 py-3 text-body text-ink placeholder:text-ink-muted/70 focus:border-ink aria-[invalid=true]:border-brand";

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Pre-launch intake entry. Posts to /api/intake, which forwards to the
 * configured intake provider. Validation runs client-side for instant
 * feedback and again on the server. One idempotency key per form instance
 * so retries of the same submission can be de-duplicated downstream.
 */
export function IntakeForm({
  submitLabel,
  dobHint,
  privacyNote,
  privacyLinkLabel,
  privacyNoteTrail,
  confirmationHeadline,
}: IntakeFormProps) {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", dateOfBirth: "", state: "" });
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [idempotencyKey] = useState(newKey);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the server message or the confirmation once rendered.
  useEffect(() => {
    if (status === "error" && serverMessage) alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status, serverMessage]);

  const update =
    (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: event.target.value }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };

  const focusFirstError = (errs: IntakeErrors) => {
    const first = (Object.keys(errs) as Array<keyof IntakeErrors>).find((k) => errs[k]);
    if (first) document.getElementById(`${id}-${first}`)?.focus();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const result = validateIntake({ ...values, idempotencyKey });
    if (result.errors) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }
    setStatus("submitting");
    setServerMessage(null);
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: IntakeErrors;
        error?: string;
      };
      if (response.ok && payload.ok) {
        setStatus("success");
        return;
      }
      if (payload.errors && Object.keys(payload.errors).length) {
        setErrors(payload.errors);
        setServerMessage("Please check the highlighted fields.");
        setStatus("error");
        focusFirstError(payload.errors);
        return;
      }
      setServerMessage(payload.error ?? "Something went wrong on our side. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite">
        <h2 ref={successRef} tabIndex={-1} className="font-serif text-h2 outline-none">
          {confirmationHeadline}
        </h2>
      </div>
    );
  }

  const describedBy = (field: keyof Values, extra?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={`${id}-privacy`}>
      <div>
        <label htmlFor={`${id}-name`} className="block text-base font-medium text-ink">
          Full name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={cn(fieldClass, "mt-2")}
        />
        <FieldError id={`${id}-name-error`} message={errors.name} />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="block text-base font-medium text-ink">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={cn(fieldClass, "mt-2")}
        />
        <FieldError id={`${id}-email-error`} message={errors.email} />
      </div>

      <div>
        <label htmlFor={`${id}-dateOfBirth`} className="block text-base font-medium text-ink">
          Date of birth
        </label>
        <input
          id={`${id}-dateOfBirth`}
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
          required
          value={values.dateOfBirth}
          onChange={update("dateOfBirth")}
          aria-invalid={Boolean(errors.dateOfBirth)}
          aria-describedby={describedBy("dateOfBirth", `${id}-dob-hint`)}
          className={cn(fieldClass, "mt-2")}
        />
        <p id={`${id}-dob-hint`} className="mt-2 text-base text-ink-muted">
          {dobHint}
        </p>
        <FieldError id={`${id}-dateOfBirth-error`} message={errors.dateOfBirth} />
      </div>

      <div>
        <label htmlFor={`${id}-state`} className="block text-base font-medium text-ink">
          State
        </label>
        <select
          id={`${id}-state`}
          name="state"
          autoComplete="address-level1"
          required
          value={values.state}
          onChange={update("state")}
          aria-invalid={Boolean(errors.state)}
          aria-describedby={describedBy("state")}
          className={cn(
            fieldClass,
            "mt-2 appearance-none bg-chevron bg-[length:1rem_1rem] bg-[position:right_1rem_center] bg-no-repeat pr-12",
          )}
        >
          <option value="">Choose your state</option>
          {usStates.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <FieldError id={`${id}-state-error`} message={errors.state} />
      </div>

      {serverMessage && (
        <p
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-brand/40 bg-alt px-4 py-3 text-base text-ink"
        >
          {serverMessage}
        </p>
      )}

      <div className="pt-2">
        <CTAButton type="submit" aria-disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : submitLabel}
        </CTAButton>
        <p id={`${id}-privacy`} className="mt-4 max-w-measure text-base text-ink-muted">
          {privacyNote}{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-4 hover:text-brand">
            {privacyLinkLabel}
          </Link>{" "}
          {privacyNoteTrail}
        </p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-base text-brand" role="alert">
      {message}
    </p>
  );
}
