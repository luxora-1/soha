import type { ReactNode } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  /** Optional pill above the headline; only where it adds information. */
  label?: ReactNode;
  headline: ReactNode;
  subhead?: ReactNode;
  align?: "left" | "center";
  /** Which ground the heading sits on, so the pill contrasts with it. */
  tone?: "base" | "surface";
  className?: string;
};

/** Headline block shared by the landing sections: a small pill with an accent dot, the h2, an optional subhead. */
export function SectionHeading({
  id,
  label,
  headline,
  subhead,
  align = "left",
  tone = "base",
  className,
}: SectionHeadingProps) {
  return (
    <FadeUp className={cn("max-w-measure", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <p
          className={cn(
            "inline-flex min-h-[2.25rem] items-center gap-2 rounded-full px-4 text-base font-medium leading-none text-ink",
            tone === "base" ? "bg-surface" : "bg-base shadow-subtle",
          )}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {label}
        </p>
      )}
      <h2 id={id} className={cn(label ? "mt-5" : undefined)}>
        {headline}
      </h2>
      {subhead && <p className="mt-5 text-body-lg text-ink-muted">{subhead}</p>}
    </FadeUp>
  );
}
