import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type PageIntroProps = {
  eyebrow?: string;
  headline: ReactNode;
  subhead?: ReactNode;
  /** Right-hand slot (e.g. an image) on large screens. */
  aside?: ReactNode;
  /** `default` centers a single measure; `split` left-aligns with an aside. */
  layout?: "default" | "split";
  tone?: "base" | "alt";
  children?: ReactNode;
  headingId?: string;
};

/**
 * Page opener for secondary pages: eyebrow, h1, subhead. Clears the fixed
 * navbar and follows the section padding rhythm.
 */
export function PageIntro({
  eyebrow,
  headline,
  subhead,
  aside,
  layout = "default",
  tone = "base",
  children,
  headingId = "page-heading",
}: PageIntroProps) {
  const split = layout === "split";
  return (
    <section
      aria-labelledby={headingId}
      className={cn(tone === "alt" ? "bg-alt" : "bg-base", "pt-header")}
    >
      <Container className="py-section lg:py-section-lg">
        <div className={cn(split && "grid items-center gap-12 lg:grid-cols-12 lg:gap-16")}>
          <div className={cn(split ? "lg:col-span-6" : "max-w-measure")}>
            {eyebrow && <Eyebrow className="motion-safe:animate-fade-up">{eyebrow}</Eyebrow>}
            <h1
              id={headingId}
              className={cn(eyebrow && "mt-5", "motion-safe:animate-fade-up motion-safe:[animation-delay:60ms]")}
            >
              {headline}
            </h1>
            {subhead && (
              <p className="mt-6 max-w-measure text-body-lg text-ink-muted motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
                {subhead}
              </p>
            )}
            {children && (
              <div className="mt-10 motion-safe:animate-fade-up motion-safe:[animation-delay:180ms]">
                {children}
              </div>
            )}
          </div>
          {split && aside && (
            <div className="lg:col-span-5 lg:col-start-8 motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]">
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
