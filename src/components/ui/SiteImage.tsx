import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { heroVideo, imageExtensions, imageManifest, type ImageSlotName } from "@/config/images";
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
  /** `fill` covers a positioned parent (tiles/panels) instead of setting an aspect ratio. */
  mode?: "aspect" | "fill";
  /** next/image `sizes` hint; defaults to a half-width column on large screens. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Layer public/video/<number>.mp4 over the still when present (hero only). */
  withVideo?: boolean;
  /** `contain` for product shots that must not be cropped. */
  fit?: "cover" | "contain";
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

/** Finds public/video/<number>.<ext> files for the hero, if present. */
function resolveVideo(number: string): Array<{ src: string; type: string }> {
  if (number !== heroVideo.number) return [];
  const found: Array<{ src: string; type: string }> = [];
  for (const ext of heroVideo.extensions) {
    if (existsSync(join(process.cwd(), "public", "video", `${number}.${ext}`))) {
      found.push({ src: `/video/${number}.${ext}`, type: `video/${ext}` });
    }
  }
  return found;
}

/**
 * Server component. Renders the numbered photo for `slot` if a file named by
 * its number exists under public/images/, otherwise the placeholder tile
 * showing that number — so dropping the file in is the only step.
 */
export function SiteImage({
  slot,
  ratio = "portrait",
  mdRatio,
  lgRatio,
  mode = "aspect",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
  withVideo = false,
  fit = "cover",
}: SiteImageProps) {
  const entry = imageManifest[slot];
  const src = resolveImage(slot);
  const video = withVideo ? resolveVideo(entry.number) : [];

  if (!src) {
    return (
      <ImagePlaceholder
        ratio={ratio}
        mdRatio={mdRatio}
        lgRatio={lgRatio}
        mode={mode}
        label={`IMAGE ${entry.number}`}
        brief={entry.brief}
        className={className}
      />
    );
  }

  const frame =
    mode === "fill"
      ? "absolute inset-0 overflow-hidden"
      : cn(
          "relative w-full overflow-hidden rounded-tile bg-accent-soft",
          ratios[ratio],
          mdRatio && mdRatios[mdRatio],
          lgRatio && lgRatios[lgRatio],
        );

  return (
    <div className={cn(frame, className)}>
      <Image
        src={src}
        alt={entry.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
      {video.length > 0 && (
        <AmbientVideo sources={video} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
