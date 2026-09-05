import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export type SectionTone = "base" | "alt";

type SectionWrapperProps = {
  /** Background tone. Alternate `base` and `alt` down the page for rhythm. */
  tone?: SectionTone;
  /** Vertical padding: `default` = py-20 mobile / py-32 desktop. */
  padding?: "default" | "compact" | "none";
  as?: ElementType;
  id?: string;
  /** id of the heading element that labels this section. */
  labelledBy?: string;
  /** Accessible name when the section has no visible heading. */
  label?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

const tones: Record<SectionTone, string> = {
  base: "bg-base",
  alt: "bg-alt",
};

const paddings: Record<NonNullable<SectionWrapperProps["padding"]>, string> = {
  default: "py-section lg:py-section-lg",
  compact: "py-12 lg:py-16",
  none: "",
};

/**
 * Handles the page's background alternation and vertical padding rhythm so
 * individual sections only have to think about their content.
 */
export function SectionWrapper({
  tone = "base",
  padding = "default",
  as: Tag = "section",
  id,
  labelledBy,
  label,
  className,
  containerClassName,
  children,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(tones[tone], paddings[padding], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
