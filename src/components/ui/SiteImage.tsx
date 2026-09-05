import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { imageExtensions, imageManifest, type ImageSlotName } from "@/config/images";
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

type SiteImageProps = {
  slot: ImageSlotName;
  ratio?: Ratio;
  mdRatio?: Ratio;
  lgRatio?: Ratio;
  /** next/image `sizes` hint; defaults to a half-width column on large screens. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Finds public/images/<number>.<ext> for a slot, if present. */
function resolveImage(slot: ImageSlotName): string | null {
  const { number } = imageManifest[slot];
  for (const ext of imageExtensions) {
    if (existsSync(join(process.cwd(), "public", "images", `${number}.${ext}`))) {
      return `/images/${number}.${ext}`;
    }
  }
  return null;
}

/**
 * Server component. Renders the numbered photo for `slot` if a file named by
 * its number exists under public/images/, otherwise the IMAGE_PLACEHOLDER
 * block showing that number — so dropping the file in is the only step.
 */
export function SiteImage({
  slot,
  ratio = "portrait",
  mdRatio,
  lgRatio,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
}: SiteImageProps) {
  const entry = imageManifest[slot];
  const src = resolveImage(slot);

  if (!src) {
    return (
      <ImagePlaceholder
        ratio={ratio}
        mdRatio={mdRatio}
        lgRatio={lgRatio}
        label={`IMAGE ${entry.number}`}
        brief={entry.brief}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-accent-soft",
        ratios[ratio],
        mdRatio && mdRatios[mdRatio],
        lgRatio && lgRatios[lgRatio],
        className,
      )}
    >
      <Image src={src} alt={entry.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
