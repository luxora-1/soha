import { cn } from "@/lib/cn";

type IconProps = { className?: string };

/** Check mark in a soft circle. Decorative; pair with visible text. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6 shrink-0", className)}
    >
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.14" />
      <path d="M7.5 12.5l3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Filled star for the review badge. Decorative; the rating is stated in text. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={cn("h-4 w-4", className)}>
      <path d="M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6l-5.2 2.9 1.2-5.8-4.4-4 5.9-.7z" />
    </svg>
  );
}
