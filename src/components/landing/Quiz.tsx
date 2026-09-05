"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CloseIcon } from "@/components/landing/icons";
import { OPEN_QUIZ_EVENT, type OpenQuizDetail } from "@/components/landing/QuizCTA";
import { CTAButton } from "@/components/ui/CTAButton";
import { landingContent } from "@/content/landing";
import { quizCopy, quizQuestions, type QuizAnswers } from "@/content/quiz";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { captureUtm, utmToProps } from "@/lib/utm";
import { submitWaitlist, validateWaitlist } from "@/lib/waitlist";

type QuizProps = {
  page: string;
  /** Result notes per symptom key, server-rendered inside <Unverified>. */
  resultNotes: Record<string, ReactNode>;
};

type Status = "idle" | "submitting" | "error";

const QUESTIONS = quizQuestions.length;
const EMAIL_STEP = QUESTIONS;
const RESULT_STEP = QUESTIONS + 1;

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * The two-minute quiz, in a modal dialog mounted once per page. Any
 * <QuizCTA> opens it (via a window event), as does a #quiz hash. Five
 * questions, then the email step — which is the waitlist signup, with the
 * answers attached — then a summary. It makes no clinical determination.
 */
export function Quiz({ page, resultNotes }: QuizProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("unknown");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [idempotencyKey] = useState(newKey);

  // Open on the CTA event or a #quiz hash.
  useEffect(() => {
    const openWith = (from: string) => {
      setLocation(from);
      setOpen(true);
      trackEvent("quiz_open", { page, location: from });
    };
    const onEvent = (event: Event) => openWith((event as CustomEvent<OpenQuizDetail>).detail?.location ?? "unknown");
    const onHash = () => {
      if (window.location.hash === "#quiz") openWith("link");
    };
    window.addEventListener(OPEN_QUIZ_EVENT, onEvent);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener(OPEN_QUIZ_EVENT, onEvent);
      window.removeEventListener("hashchange", onHash);
    };
  }, [page]);

  // Show/hide the native dialog and lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) {
      const previous = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = previous;
      };
    }
  }, [open]);

  // Move focus to each step's heading.
  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open, step]);

  const close = () => {
    setOpen(false);
    if (window.location.hash === "#quiz") window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  };

  const question = step < QUESTIONS ? quizQuestions[step] : null;
  const chosen = question ? answers[question.key] ?? [] : [];

  const choose = (key: string) => {
    if (!question) return;
    if (question.type === "single") {
      setAnswers((a) => ({ ...a, [question.key]: [key] }));
      trackEvent("quiz_step", { page, step: question.key, count: 1 });
      window.setTimeout(() => setStep((s) => Math.min(s + 1, EMAIL_STEP)), 220);
      return;
    }
    setAnswers((a) => {
      const current = a[question.key] ?? [];
      const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
      return { ...a, [question.key]: next };
    });
  };

  const next = () => {
    if (question) trackEvent("quiz_step", { page, step: question.key, count: chosen.length });
    setStep((s) => Math.min(s + 1, EMAIL_STEP));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const utm = captureUtm();
    const result = validateWaitlist({
      email,
      page,
      location: `quiz-${location}`.replace(/[^a-z0-9-]/g, "").slice(0, 64),
      utm,
      referrer: document.referrer || undefined,
      idempotencyKey,
      quiz: answers,
    });
    if (result.errors) {
      setEmailError(result.errors.email ?? null);
      return;
    }
    setStatus("submitting");
    setMessage(null);
    const outcome = await submitWaitlist(result.data);
    if (outcome.ok) {
      const symptoms = answers.symptoms?.length ?? 0;
      trackEvent("quiz_complete", { page, location, symptoms });
      trackEvent("waitlist_submit", { page, location: `quiz-${location}`, ...utmToProps(utm) });
      setStatus("idle");
      setStep(RESULT_STEP);
      return;
    }
    if (outcome.fieldErrors?.email) setEmailError(outcome.fieldErrors.email);
    setMessage(outcome.error);
    setStatus("error");
  };

  const total = QUESTIONS + 1;
  const progress = Math.min(step + 1, total) / total;
  const symptomOptions = quizQuestions[0].options;
  const symptomsChosen = answers.symptoms ?? [];

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      aria-labelledby="quiz-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/55 backdrop:backdrop-blur-sm md:m-auto md:h-auto md:max-h-[92vh] md:w-[min(42rem,94vw)]"
    >
      <div className="flex h-full flex-col bg-base md:max-h-[92vh] md:rounded-tile md:shadow-lift">
        <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-8 md:pt-7">
          <div className="min-w-0">
            <p id="quiz-title" className="font-serif text-[1.125rem] leading-tight tracking-heading text-ink">
              {quizCopy.title}
            </p>
            <p className="mt-1 text-[0.875rem] text-ink-muted">
              {step >= RESULT_STEP ? quizCopy.result.heading : quizCopy.progress(Math.min(step + 1, total), total)}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={quizCopy.close}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink hover:bg-accent-soft/60"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mx-5 mt-4 h-1 overflow-hidden rounded-full bg-surface md:mx-8" aria-hidden="true">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8" key={step}>
          <div className="motion-safe:animate-fade-in">
            {question && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="font-serif text-[1.75rem] leading-tight tracking-heading text-ink outline-none md:text-[2rem]">
                  {question.question}
                </h2>
                <p className="mt-2 text-base text-ink-muted">{("hint" in question && question.hint) || (step === 0 ? quizCopy.intro : "")}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2" aria-label={question.question}>
                  {question.options.map((option) => {
                    const selected = chosen.includes(option.key);
                    return (
                      <li key={option.key}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => choose(option.key)}
                          className={cn(
                            "flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-card px-4 py-3 text-left text-base text-ink transition-colors motion-reduce:transition-none",
                            selected ? "bg-primary text-on-primary" : "bg-surface hover:bg-accent-soft/50",
                          )}
                        >
                          <span>{option.label}</span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              question.type === "multi" ? "rounded-[0.35rem]" : "",
                              selected ? "bg-base/20" : "bg-ink/10",
                            )}
                          >
                            {selected && <span className="block h-2 w-2 rounded-full bg-on-primary" />}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {step === EMAIL_STEP && (
              <form noValidate onSubmit={submit}>
                <h2 ref={headingRef} tabIndex={-1} className="font-serif text-[1.75rem] leading-tight tracking-heading text-ink outline-none md:text-[2rem]">
                  {quizCopy.email.heading}
                </h2>
                <p className="mt-2 text-base text-ink-muted">{quizCopy.email.body}</p>
                <label htmlFor="quiz-email" className="mt-6 block text-base font-medium text-ink">
                  {quizCopy.email.label}
                </label>
                <input
                  id="quiz-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={quizCopy.email.placeholder}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "quiz-email-error" : "quiz-privacy"}
                  className="mt-2 block w-full min-h-[3.5rem] rounded-full bg-surface px-5 text-body text-ink placeholder:text-ink-muted/70 aria-[invalid=true]:shadow-[inset_0_0_0_2px_rgb(var(--primary-rgb))]"
                />
                {emailError && (
                  <p id="quiz-email-error" role="alert" className="mt-2 px-2 text-base text-primary">
                    {emailError}
                  </p>
                )}
                {message && (
                  <p role="alert" className="mt-3 rounded-card bg-surface px-4 py-3 text-base text-ink">
                    {message}
                  </p>
                )}
                <p id="quiz-privacy" className="mt-3 text-caption text-ink-muted">
                  {landingContent.waitlist.privacy.lead}{" "}
                  <Link href="/privacy" className="text-ink underline underline-offset-4">
                    {landingContent.waitlist.privacy.link}
                  </Link>
                  {landingContent.waitlist.privacy.trail}
                </p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={back} className="inline-flex min-h-tap items-center justify-center px-2 text-base text-ink-muted underline-offset-4 hover:underline">
                    {quizCopy.back}
                  </button>
                  <CTAButton type="submit" aria-disabled={status === "submitting"} className="w-full sm:w-auto">
                    {status === "submitting" ? quizCopy.email.submitting : quizCopy.email.submit}
                  </CTAButton>
                </div>
              </form>
            )}

            {step === RESULT_STEP && (
              <div role="status" aria-live="polite">
                <h2 ref={headingRef} tabIndex={-1} className="font-serif text-[1.75rem] leading-tight tracking-heading text-ink outline-none md:text-[2rem]">
                  {quizCopy.result.heading}
                </h2>
                <p className="mt-2 text-base text-ink-muted">{quizCopy.result.lead}</p>
                {symptomsChosen.length ? (
                  <>
                    <p className="mt-6 text-base font-medium text-ink">{quizCopy.result.youSaid}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {symptomsChosen.map((key) => (
                        <li key={key} className="rounded-full bg-surface px-3 py-1.5 text-base text-ink">
                          {symptomOptions.find((o) => o.key === key)?.label ?? key}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 space-y-3">
                      {symptomsChosen.map((key) =>
                        resultNotes[key] ? (
                          <li key={key} className="rounded-card bg-surface px-4 py-3 text-base text-ink">
                            {resultNotes[key]}
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </>
                ) : (
                  <p className="mt-6 text-base text-ink">{quizCopy.result.nothingSelected}</p>
                )}
                <p className="mt-6 text-base text-ink-muted">{quizCopy.result.next}</p>
                <div className="mt-8">
                  <CTAButton type="button" onClick={close} className="w-full sm:w-auto">
                    {quizCopy.result.done}
                  </CTAButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {question && (
          <div className="flex items-center justify-between gap-3 border-t border-accent-soft/40 px-5 py-4 md:px-8">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex min-h-tap items-center px-2 text-base text-ink-muted underline-offset-4 hover:underline disabled:invisible"
            >
              {quizCopy.back}
            </button>
            <div className="flex items-center gap-3">
              {question.type === "multi" && chosen.length === 0 && (
                <button type="button" onClick={next} className="inline-flex min-h-tap items-center px-2 text-base text-ink-muted underline-offset-4 hover:underline">
                  {quizCopy.skip}
                </button>
              )}
              <CTAButton type="button" onClick={chosen.length ? next : undefined} aria-disabled={chosen.length === 0} className={cn(chosen.length === 0 && "opacity-60")}>
                {quizCopy.next}
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
