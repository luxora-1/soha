import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, PlayIcon, StackIcon } from "@/components/social/icons";
import type { SocialPost } from "@/lib/social/types";
import { cn } from "@/lib/cn";

type SocialPostCardProps = {
  post: SocialPost;
  /**
   * Where the card leads. Default: the post on its platform (new tab). Pass
   * an internal path to keep visitors on the site, or null for no link.
   */
  href?: string | null;
  /** next/image `sizes` hint for the square. */
  sizes?: string;
  /** Show the caption under the image. */
  showCaption?: boolean;
  className?: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" });

/**
 * One post: a square image (the thumbnail for videos), a small mark for
 * videos and carousels, and the caption clamped to three lines. Placeholder
 * posts (no media) render a neutral block labelled with the post id.
 */
export function SocialPostCard({ post, href, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw", showCaption = true, className }: SocialPostCardProps) {
  const target = href === undefined ? post.permalink : href;
  const external = target !== null && /^https?:/.test(target);
  const date = dateFormat.format(new Date(post.timestamp));
  const label = post.caption ? post.caption.slice(0, 80) : `Post from ${date}`;

  const media = (
    <div className="relative aspect-square w-full overflow-hidden rounded-card bg-surface">
      {post.mediaUrl ? (
        <Image
          src={post.mediaUrl}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      ) : (
        // IMAGE_PLACEHOLDER: no media on placeholder posts.
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-accent-soft/45 p-4 text-center">
          <span className="rounded-full bg-base/75 px-3 py-1 font-sans text-[0.8125rem] font-medium leading-snug text-ink">{post.id}</span>
          <span className="font-sans text-[0.75rem] text-ink-muted">1080 × 1080</span>
        </div>
      )}
      {post.mediaType !== "image" && (
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-on-ink backdrop-blur-sm">
          {post.mediaType === "video" ? <PlayIcon /> : <StackIcon />}
          <span className="sr-only">{post.mediaType === "video" ? "Video" : "Several images"}</span>
        </span>
      )}
    </div>
  );

  const body = (
    <>
      {media}
      {showCaption && (
        <div className="mt-3 flex flex-col gap-1.5 px-1">
          {post.caption && <p className="line-clamp-3 text-base leading-snug text-ink">{post.caption}</p>}
          <p className="flex items-center gap-1.5 text-[0.875rem] text-ink-muted">
            <InstagramIcon className="h-4 w-4" />
            <time dateTime={post.timestamp}>{date}</time>
          </p>
        </div>
      )}
    </>
  );

  const classes = cn("group block rounded-card focus-visible:outline-offset-4", className);

  if (target === null) return <article className={classes}>{body}</article>;
  if (external) {
    return (
      <a href={target} target="_blank" rel="noopener noreferrer" aria-label={`${label} — opens on Instagram`} className={classes}>
        {body}
      </a>
    );
  }
  return (
    <Link href={target} aria-label={label} className={classes}>
      {body}
    </Link>
  );
}
