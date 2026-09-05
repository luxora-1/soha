import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  /** Optional pill above the headline; only where it adds information. */
  label?: string;
  headline: ReactNode;
  subhead?: ReactNode;
  align?: "left" | "center";
  /** Which ground the heading sits on, so the pill contrasts with it. */
  tone?: "base" | "surface";
  className?: string;
};

/** Headline block shared by the landing sections. */
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
    <div className={cn("max-w-measure", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <p
          className={cn(
            "inline-flex min-h-[2.25rem] items-center rounded-full px-4 text-base font-medium leading-none text-ink",
            tone === "base" ? "bg-surface" : "bg-base",
          )}
        >
          {label}
        </p>
      )}
      <h2 id={id} className={cn(label && "mt-5")}>
        {headline}
      </h2>
      {subhead && <p className="mt-5 text-body-lg text-ink-muted">{subhead}</p>}
    </div>
  );
}
