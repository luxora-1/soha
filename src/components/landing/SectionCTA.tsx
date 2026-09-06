import type { ReactNode } from "react";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

type SectionCTAProps = {
  location: string;
  label?: string;
  /** Small line under the button; may contain <Unverified> claims. */
  helper?: ReactNode;
  variant?: "primary" | "inverse";
  align?: "center" | "left";
  className?: string;
};

/** The quiz button that closes most sections, with an optional line beneath. */
export function SectionCTA({ location, label, helper = landingContent.quizCta.helper, variant = "primary", align = "center", className }: SectionCTAProps) {
  return (
    <div className={cn("mt-10 flex flex-col gap-3 md:mt-12", align === "center" ? "items-center text-center" : "items-start", className)}>
      <QuizCTA location={location} label={label} variant={variant} className="w-full sm:w-auto" />
      {helper && <p className={cn("text-caption", variant === "inverse" ? "text-on-primary/75" : "text-ink-muted")}>{helper}</p>}
    </div>
  );
}
