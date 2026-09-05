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

/**
 * Server component. Renders the file at public/images/landing/{id}.{ext}
 * when one exists; otherwise a neutral IMAGE_PLACEHOLDER block at the same
 * aspect ratio with the slot id printed in the centre, so it is obvious
 * which image goes where. Dropping the file in is the only step to replace
 * a placeholder (rebuild or redeploy in production).
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
}: ImageSlotProps) {
  const found = resolveFile(id);
  const frame = cn("relative w-full overflow-hidden rounded-tile", className);
  const ratio = { aspectRatio: `${width} / ${height}` };

  if (!found) {
    return (
      <div
        role="img"
        aria-label={alt}
        data-image-slot={id}
        className={cn(frame, "bg-accent-soft/45")}
        style={ratio}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
          <span className="max-w-full rounded-full bg-base/75 px-3 py-1 font-sans text-[0.8125rem] font-medium leading-snug text-ink [overflow-wrap:anywhere]">
            {id}
          </span>
          <span className="font-sans text-[0.75rem] tabular-nums text-ink-muted">
            {width} × {height}
          </span>
        </div>
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
