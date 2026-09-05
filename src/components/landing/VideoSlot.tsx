import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { VideoPlayer } from "@/components/landing/VideoPlayer";
import { slot, type LandingSlotId } from "@/config/landing-images";
import { cn } from "@/lib/cn";

const VIDEO_EXTENSIONS = [
  ["mp4", "video/mp4"],
  ["webm", "video/webm"],
] as const;

/** public/video/landing/<id>.<ext> files, if any. */
export function resolveVideo(id: string): Array<{ src: string; type: string }> {
  return VIDEO_EXTENSIONS.filter(([ext]) => existsSync(join(process.cwd(), "public", "video", "landing", `${id}.${ext}`))).map(
    ([ext, type]) => ({ src: `/video/landing/${id}.${ext}`, type }),
  );
}

type VideoSlotProps = {
  id: LandingSlotId;
  /** Accessible name of the play button. */
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Anything laid over the poster, e.g. a title pill along the bottom. */
  overlay?: ReactNode;
  hoverZoom?: boolean;
};

/**
 * An image slot that becomes a video when public/video/landing/{id}.mp4 (or
 * .webm) exists: the image stays as the poster and a play button opens the
 * video in a dialog. Without a video file it is simply the image.
 */
export function VideoSlot({ id, label, sizes, priority, className, overlay, hoverZoom }: VideoSlotProps) {
  const sources = resolveVideo(id);
  return (
    <div className={cn("relative", className)}>
      <ImageSlot {...slot(id)} sizes={sizes} priority={priority} hoverZoom={hoverZoom} />
      {overlay}
      {sources.length > 0 && <VideoPlayer sources={sources} label={label} />}
    </div>
  );
}
