import { ImageSlot } from "@/components/landing/ImageSlot";
import { Unverified } from "@/components/landing/Unverified";
import type { LandingSlotId } from "@/config/landing-images";
import { slot } from "@/config/landing-images";
import { cn } from "@/lib/cn";

export type Certification = {
  slot: LandingSlotId;
  /** The mark's name as shown under it, e.g. "PCAB accredited". */
  name: string;
  /** What has to be verified about this mark. */
  verify: string;
};

type CertificationMarqueeProps = {
  items: readonly Certification[];
  className?: string;
};

/**
 * Certification marks that glide slowly from right to left, the way the
 * reference sites present them. The row is duplicated once so the loop is
 * seamless; the copy is aria-hidden so screen readers hear each mark once.
 * Pauses on hover and keyboard focus. Under reduced motion the duplicate is
 * dropped and the row scrolls sideways by hand instead.
 */
export function CertificationMarquee({ items, className }: CertificationMarqueeProps) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-stretch gap-4 pr-4 md:gap-6 md:pr-6"
    >
      {items.map((item) => (
        <li key={item.slot} className="w-[11.5rem] shrink-0 md:w-[14rem]">
          <div className="flex h-full flex-col items-center gap-3 rounded-card bg-base p-4 text-center shadow-soft">
            <ImageSlot {...slot(item.slot)} sizes="200px" fit="contain" className="w-full rounded-[0.75rem]" />
            <p className="text-[0.9375rem] font-medium leading-snug text-ink">
              {hidden ? item.name : <Unverified note={`certification: ${item.verify}`}>{item.name}</Unverified>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group -mx-6 overflow-hidden px-6 pb-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:mx-0 md:px-0 motion-reduce:overflow-x-auto motion-reduce:[mask-image:none] motion-reduce:[scrollbar-width:none] motion-reduce:[&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="flex w-max motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]">
        {row(false)}
        <span className="contents motion-reduce:hidden">{row(true)}</span>
      </div>
    </div>
  );
}
