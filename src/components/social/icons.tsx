import { cn } from "@/lib/cn";

type IconProps = { className?: string };

/** Instagram glyph (outline camera). Decorative; pair with visible text. */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("h-5 w-5", className)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Marks a video post. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={cn("h-4 w-4", className)}>
      <path d="M8 5.5v13l10-6.5z" />
    </svg>
  );
}

/** Marks a carousel post (several images). */
export function StackIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn("h-4 w-4", className)}>
      <rect x="7" y="3" width="14" height="14" rx="2.5" />
      <path d="M3.5 8v9.5A3 3 0 0 0 6.5 20.5H16" />
    </svg>
  );
}
