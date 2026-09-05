"use client";

import { ArrowRightIcon } from "@/components/landing/icons";
import { CTAButton } from "@/components/ui/CTAButton";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/** Window event the quiz dialog listens for. */
export const OPEN_QUIZ_EVENT = "soha:open-quiz";

export type OpenQuizDetail = { location: string };

export function openQuiz(location: string) {
  window.dispatchEvent(new CustomEvent<OpenQuizDetail>(OPEN_QUIZ_EVENT, { detail: { location } }));
}

type QuizCTAProps = {
  /** Where on the page the button sits, for analytics: "hero", "outcomes", … (a-z, 0-9, hyphens). */
  location: string;
  label?: string;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "sm";
  /** A slow ring pulsing out from the button, for the one button that should draw the eye. */
  pulse?: boolean;
  className?: string;
};

/**
 * Any "Take the quiz" button. Opens the single quiz dialog mounted on the
 * page. The arrow nudges right on hover.
 */
export function QuizCTA({ location, label = landingContent.quizCta.label, variant = "primary", size = "md", pulse = false, className }: QuizCTAProps) {
  return (
    <CTAButton
      type="button"
      variant={variant}
      size={size}
      className={cn(
        pulse &&
          "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-brand/35 after:content-[''] motion-safe:after:animate-pulse-ring",
        className,
      )}
      onClick={() => openQuiz(location)}
      data-quiz-cta={location}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1" />
    </CTAButton>
  );
}
