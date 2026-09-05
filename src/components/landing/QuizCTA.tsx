"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { landingContent } from "@/content/landing";

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
  className?: string;
};

/** Any "Take the quiz" button. Opens the single quiz dialog mounted on the page. */
export function QuizCTA({ location, label = landingContent.quizCta.label, variant = "primary", size = "md", className }: QuizCTAProps) {
  return (
    <CTAButton type="button" variant={variant} size={size} className={className} onClick={() => openQuiz(location)} data-quiz-cta={location}>
      {label}
    </CTAButton>
  );
}
