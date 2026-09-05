"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { landingContent } from "@/content/landing";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { captureUtm, utmToProps } from "@/lib/utm";
import { submitWaitlist, validateWaitlist, type WaitlistFieldErrors } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

type WaitlistFormProps = {
  /** Landing page id, sent with the submission and the conversion event. */
  page: string;
  /** Where on the page this instance sits: "hero" | "pricing" | "closing". */
  location: string;
  /** Button label; the same words open the form and submit it. */
  label: string;
  /** Small line under the button while collapsed. */
  helper?: string;
  /** Start as a single button that reveals the email field on click. */
  collapsed?: boolean;
  /** The ground the form sits on, so the field and button contrast with it. */
  tone?: "base" | "surface" | "primary";
  className?: string;
};

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Waitlist email capture — the landing page's conversion.
 *
 * Every CTA on the page is one of these. Collapsed, it is a single button;
 * clicking it reveals the email field in place, so no CTA scroll-jumps the
 * reader. On submit it validates, calls `submitWaitlist` (the one handler to
 * point at a real endpoint, see src/lib/waitlist/submit.ts) with the email,
 * the page and location, and the UTM parameters captured on arrival, then
 * fires the `waitlist_submit` analytics event and shows a confirmation.
 */
export function WaitlistForm({
  page,
  location,
  label,
  helper,
  collapsed = false,
  tone = "base",
  className,
}: WaitlistFormProps) {
  const id = useId();
  const copy = landingContent.waitlist;
  const onPrimary = tone === "primary";

  const [open, setOpen] = useState(!collapsed);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<WaitlistFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [idempotencyKey] = useState(newKey);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the error message or the confirmation once rendered.
  useEffect(() => {
    if (status === "error" && message) alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status, message]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const utm = captureUtm();
    const result = validateWaitlist({
      email,
      page,
      location,
      utm,
      referrer: document.referrer || undefined,
      idempotencyKey,
    });
    if (result.errors) {
      setErrors(result.errors);
      document.getElementById(`${id}-email`)?.focus();
      return;
    }

    setStatus("submitting");
    setMessage(null);
    const outcome = await submitWaitlist(result.data);
    if (outcome.ok) {
      trackEvent("waitlist_submit", { page, location, ...utmToProps(utm) });
      setStatus("success");
      return;
    }
    if (outcome.fieldErrors) setErrors(outcome.fieldErrors);
    setMessage(outcome.error);
    setStatus("error");
  };

  const buttonVariant = onPrimary ? "inverse" : "primary";
  const buttonClass = "min-h-[3.5rem] w-full sm:w-auto";

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn("rounded-card p-5 text-left", onPrimary ? "bg-base/10" : tone === "surface" ? "bg-base" : "bg-surface", className)}
      >
        <h3
          ref={successRef}
          tabIndex={-1}
          className={cn("font-serif text-[1.5rem] leading-tight tracking-heading outline-none", onPrimary ? "text-on-primary" : "text-ink")}
        >
          {copy.success.headline}
        </h3>
        <p className={cn("mt-2 text-base", onPrimary ? "text-on-primary/80" : "text-ink-muted")}>{copy.success.body}</p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className={className}>
        <CTAButton type="button" variant={buttonVariant} onClick={() => setOpen(true)} aria-expanded={false} className={buttonClass}>
          {label}
        </CTAButton>
        {helper && (
          <p className={cn("mt-3 text-caption", onPrimary ? "text-on-primary/70" : "text-ink-muted")}>{helper}</p>
        )}
      </div>
    );
  }

  const fieldClass = cn(
    "block w-full min-h-[3.5rem] rounded-full px-5 text-body text-ink placeholder:text-ink-muted/70 aria-[invalid=true]:shadow-[inset_0_0_0_2px_rgb(var(--primary-rgb))]",
    tone === "base" && "bg-surface",
    tone === "surface" && "bg-base shadow-subtle",
    onPrimary && "bg-base focus-visible:outline-base",
  );

  return (
    <form noValidate onSubmit={onSubmit} className={cn("text-left", className)} aria-describedby={`${id}-privacy`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">
            {copy.label}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={copy.placeholder}
            value={email}
            autoFocus={collapsed}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors({});
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p
              id={`${id}-email-error`}
              role="alert"
              className={cn("mt-2 px-2 text-base", onPrimary ? "text-on-primary" : "text-primary")}
            >
              {errors.email}
            </p>
          )}
        </div>
        <CTAButton type="submit" variant={buttonVariant} aria-disabled={status === "submitting"} className={buttonClass}>
          {status === "submitting" ? copy.submitting : label}
        </CTAButton>
      </div>

      {message && (
        <p
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            "mt-3 rounded-card px-4 py-3 text-base outline-none",
            onPrimary ? "bg-base/10 text-on-primary" : "bg-surface text-ink",
          )}
        >
          {message}
        </p>
      )}

      <p id={`${id}-privacy`} className={cn("mt-3 text-caption", onPrimary ? "text-on-primary/70" : "text-ink-muted")}>
        {copy.privacy.lead}{" "}
        <Link
          href="/privacy"
          className={cn("underline underline-offset-4", onPrimary ? "text-on-primary focus-visible:outline-base" : "text-ink")}
        >
          {copy.privacy.link}
        </Link>
        {copy.privacy.trail}
      </p>
    </form>
  );
}
