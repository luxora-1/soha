import { cn } from "@/lib/cn";

type Ratio = "portrait" | "landscape" | "square" | "wide";

const ratios: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

/** Same ratios, applied from the `md` breakpoint up. */
const mdRatios: Record<Ratio, string> = {
  portrait: "md:aspect-[4/5]",
  landscape: "md:aspect-[4/3]",
  square: "md:aspect-square",
  wide: "md:aspect-[16/9]",
};

/** Same ratios, applied from the `lg` breakpoint up. */
const lgRatios: Record<Ratio, string> = {
  portrait: "lg:aspect-[4/5]",
  landscape: "lg:aspect-[4/3]",
  square: "lg:aspect-square",
  wide: "lg:aspect-[16/9]",
};

type ImagePlaceholderProps = {
  /** Aspect ratio on small screens (and everywhere, unless overridden below). */
  ratio?: Ratio;
  /** Aspect ratio from the `md` breakpoint up. */
  mdRatio?: Ratio;
  /** Aspect ratio from the `lg` breakpoint up. */
  lgRatio?: Ratio;
  className?: string;
  /**
   * Note for the person sourcing photography, e.g. "Woman, 50s, at home".
   * Rendered as a data attribute only so it is easy to grep for.
   */
  brief?: string;
};

/**
 * IMAGE_PLACEHOLDER — a solid soft-neutral block standing in for brand
 * photography. Decorative (aria-hidden); swap for `next/image` with real alt
 * text when assets exist.
 */
export function ImagePlaceholder({
  ratio = "portrait",
  mdRatio,
  lgRatio,
  className,
  brief,
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      data-image-brief={brief}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-accent-soft",
        ratios[ratio],
        mdRatio && mdRatios[mdRatio],
        lgRatio && lgRatios[lgRatio],
        className,
      )}
    >
      <span className="absolute inset-0 flex items-center justify-center font-sans text-eyebrow uppercase tracking-eyebrow text-ink-muted">
        IMAGE_PLACEHOLDER
      </span>
    </div>
  );
}
