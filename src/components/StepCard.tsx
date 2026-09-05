import { FadeUp } from "@/components/motion/FadeUp";
import { Chip } from "@/components/ui/Chip";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ImageSlotName } from "@/config/images";
import { cn } from "@/lib/cn";

type StepCardProps = {
  /** Display number, e.g. "01". Decorative — the parent <ol> conveys order. */
  number: string;
  title: string;
  body: string;
  /** When set, the card leads with a photo tile carrying the number chip. */
  imageSlot?: ImageSlotName;
  /** Stagger offset in seconds for the fade-up entrance. */
  delay?: number;
  className?: string;
};

/**
 * One numbered step. Renders as an <li> (fading up on scroll); place inside
 * an <ol> so the order is conveyed semantically. With `imageSlot` it is an
 * image-led tile; without, a bordered text card.
 */
export function StepCard({ number, title, body, imageSlot, delay = 0, className }: StepCardProps) {
  if (imageSlot) {
    return (
      <FadeUp as="li" delay={delay} className={cn("flex h-full flex-col", className)}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-tile">
          <SiteImage slot={imageSlot} mode="fill" sizes="(min-width: 1024px) 33vw, 100vw" />
          <span aria-hidden="true" className="absolute left-4 top-4">
            <Chip variant="glass" className="font-serif text-[1.125rem] tracking-heading">
              {number}
            </Chip>
          </span>
        </div>
        <h3 className="mt-6 text-ink">{title}</h3>
        <p className="mt-3 max-w-measure text-body text-ink-muted">{body}</p>
      </FadeUp>
    );
  }

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
