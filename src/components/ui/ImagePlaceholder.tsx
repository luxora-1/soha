import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/cn";

type Ratio = "portrait" | "landscape" | "square" | "wide";

const ratios: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};
const mdRatios: Record<Ratio, string> = {
  portrait: "md:aspect-[4/5]",
  landscape: "md:aspect-[4/3]",
  square: "md:aspect-square",
  wide: "md:aspect-[16/9]",
};
const lgRatios: Record<Ratio, string> = {
  portrait: "lg:aspect-[4/5]",
  landscape: "lg:aspect-[4/3]",
  square: "lg:aspect-square",
  wide: "lg:aspect-[16/9]",
};

type ImagePlaceholderProps = {
  ratio?: Ratio;
  mdRatio?: Ratio;
  lgRatio?: Ratio;
  /** `fill` covers a positioned parent instead of setting its own aspect ratio. */
  mode?: "aspect" | "fill";
  className?: string;
  /** Art-direction note, rendered as a data attribute so it is easy to grep. */
  brief?: string;
  /** Small corner label, e.g. "IMAGE 03". */
  label?: string;
};

/**
 * IMAGE_PLACEHOLDER — a warm gradient tile with film grain standing in for
 * photography, labelled with its slot number in the corner. Decorative
 * (aria-hidden); SiteImage swaps it for next/image when the file exists.
 */
export function ImagePlaceholder({
  ratio = "portrait",
  mdRatio,
  lgRatio,
  mode = "aspect",
  className,
  brief,
  label = "IMAGE_PLACEHOLDER",
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      data-image-brief={brief}
      className={cn(
        "overflow-hidden bg-tile-placeholder",
        mode === "fill"
          ? "absolute inset-0"
          : cn("relative w-full rounded-tile", ratios[ratio], mdRatio && mdRatios[mdRatio], lgRatio && lgRatios[lgRatio]),
        className,
      )}
    >
      <Grain />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-ink/10 bg-base/55 px-2.5 py-1 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-ink/80 backdrop-blur-sm">
          {label}
        </span>
      </span>
    </div>
  );
}
