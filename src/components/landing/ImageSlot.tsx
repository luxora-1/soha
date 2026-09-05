import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Accepted file types, checked in this order. */
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif", "svg"] as const;
/** public/images/landing */
const DIR = ["images", "landing"] as const;

type ImageSlotProps = {
  /** Slot id — also the file name: public/images/landing/{id}.{ext}. */
  id: string;
  /** Intrinsic size; together they fix the slot's aspect ratio. */
  width: number;
  height: number;
  alt: string;
  /** Preload; only for the image that is on screen at load. */
  priority?: boolean;
  /** next/image `sizes` hint. Default: half the viewport on large screens, full width below. */
  sizes?: string;
  /** `contain` for product shots that must not be cropped. */
  fit?: "cover" | "contain";
  /** Extra classes on the frame (radius, shadow, …). */
  className?: string;
  /** Fill a positioned parent instead of setting the slot's own aspect ratio (carousel frames). */
  fill?: boolean;
  /** Small thumbnails: show only a tiny id label in the placeholder. */
  compact?: boolean;
};

/** public/images/landing/<id>.<ext>, if such a file exists. */
function resolveFile(id: string): { src: string; ext: string } | null {
  for (const ext of EXTENSIONS) {
    const file = `${id}.${ext}`;
    if (existsSync(join(process.cwd(), "public", ...DIR, file))) {
      return { src: `/${DIR.join("/")}/${file}`, ext };
    }
  }
  return null;
}

/** A stable number in [0, 1) from the id, so each placeholder gets its own light. */
function seed(id: string): number {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % 1000) / 1000;
}

/**
 * IMAGE_PLACEHOLDER art direction: soft, warm light on a tinted ground, the
 * way the finished photography will sit. Every value is a palette token so
 * it follows the scheme; the seed only moves the light around.
 */
function placeholderStyle(id: string): React.CSSProperties {
  const s = seed(id);
  const x = 20 + Math.round(s * 60);
  const y = 15 + Math.round(((s * 7) % 1) * 50);
  const x2 = 100 - x;
  return {
    backgroundImage: [
      `radial-gradient(60% 55% at ${x}% ${y}%, rgb(var(--bg-rgb) / 0.85) 0%, rgb(var(--bg-rgb) / 0) 70%)`,
      `radial-gradient(70% 70% at ${x2}% ${100 - y}%, rgb(var(--accent-rgb) / 0.22) 0%, rgb(var(--accent-rgb) / 0) 75%)`,
      `radial-gradient(90% 90% at 50% 120%, rgb(var(--primary-rgb) / 0.18) 0%, rgb(var(--primary-rgb) / 0) 70%)`,
      `linear-gradient(160deg, rgb(var(--accent-soft-rgb) / 0.75), rgb(var(--surface-rgb)))`,
    ].join(", "),
  };
}

/**
 * Server component. Renders the file at public/images/landing/{id}.{ext}
 * when one exists; otherwise an IMAGE_PLACEHOLDER at the same aspect ratio,
 * art-directed as soft light on a tinted ground with the slot id in the
 * corner, so it reads as a photo's place rather than a hole. Dropping the
 * file in is the only step to replace it (rebuild or redeploy in production).
 */
export function ImageSlot({
  id,
  width,
  height,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fit = "cover",
  className,
  fill = false,
  compact = false,
}: ImageSlotProps) {
  const found = resolveFile(id);
  const frame = cn(fill ? "absolute inset-0 overflow-hidden" : "relative w-full overflow-hidden rounded-tile", className);
  const ratio = fill ? undefined : { aspectRatio: `${width} / ${height}` };

  if (!found) {
    return (
      <div role="img" aria-label={alt} data-image-slot={id} className={cn(frame, "isolate")} style={{ ...ratio, ...placeholderStyle(id) }}>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain bg-[length:200px_200px] opacity-[0.16] mix-blend-multiply" />
        <span
          className={cn(
            "absolute font-sans font-medium leading-none tracking-wide text-ink/70",
            compact
              ? "inset-x-1 bottom-1 truncate text-center text-[0.5625rem]"
              : "bottom-3 left-3 rounded-full bg-base/70 px-2.5 py-1 text-[0.6875rem] backdrop-blur-sm",
          )}
        >
          {id}
          {!compact && <span className="ml-1.5 text-ink/45 tabular-nums">{width}×{height}</span>}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(frame, "bg-surface")} style={ratio} data-image-slot={id}>
      <Image
        src={found.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={found.ext === "svg"}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
