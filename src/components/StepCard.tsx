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
        "flex h-full flex-col rounded-2xl border border-accent-soft bg-base p-8 md:p-6 lg:p-10",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-serif text-[2rem] leading-none tracking-heading text-brand tabular-nums"
      >
        {number}
      </span>
      <h3 className="mt-8 text-ink">{title}</h3>
      <p className="mt-3 text-body text-ink-muted">{body}</p>
    </FadeUp>
  );
}
