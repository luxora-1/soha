import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

type StepCardProps = {
  /** Display number, e.g. "01". Decorative — the parent <ol> conveys order. */
  number: string;
  title: string;
  body: string;
  /** Stagger offset in seconds for the fade-up entrance. */
  delay?: number;
  className?: string;
};

/**
 * One numbered step. Renders as an <li> (fading up on scroll); place inside
 * an <ol> so the order is conveyed semantically.
 *
 * Layout: stacked on phones; number-beside-text on tablets (where three
 * columns would be cramped); three stacked-number columns from `lg`.
 */
export function StepCard({
  number,
  title,
  body,
  delay = 0,
  className,
}: StepCardProps) {
  return (
    <FadeUp
      as="li"
      delay={delay}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-accent-soft bg-base p-8 md:flex-row md:items-start md:gap-8 lg:flex-col lg:gap-0 lg:p-10",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-serif text-[2rem] leading-none tracking-heading text-brand tabular-nums md:w-12 md:shrink-0 md:pt-1 lg:w-auto lg:pt-0"
      >
        {number}
      </span>
      <div className="mt-8 md:mt-0 lg:mt-8">
        <h3 className="text-ink">{title}</h3>
        <p className="mt-3 max-w-measure text-body text-ink-muted">{body}</p>
      </div>
    </FadeUp>
  );
}
