import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Check mark in a soft circle. Decorative; pair with visible text. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn("h-6 w-6 shrink-0", className)}>
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

/** Small upward arrow beside an improving figure. */
export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-5 w-5", className)}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

/** Right-pointing chevron; rotate for other directions. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-5 w-5", className)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={cn("h-6 w-6", className)}>
      <path d="M8 5.5v13l10-6.5z" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-5 w-5", className)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-5 w-5", className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-6 w-6", className)}>
      <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.75" />
      <circle cx="17" cy="17.5" r="1.75" />
    </svg>
  );
}

/** Benefit icons, keyed to landingContent.benefits.items[].icon. Simple line drawings in the accent colour. */
export const benefitIcons = {
  rx: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M6 4h5a3.5 3.5 0 010 7H6zM6 4v16M11 11l7 8M18 11l-7 8" />
    </svg>
  ),
  truck: ({ className }: IconProps) => <TruckIcon className={cn("h-7 w-7", className)} />,
  chat: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  card: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h4" />
    </svg>
  ),
  shield: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  dial: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </svg>
  ),
  refund: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M4 12a8 8 0 1014-5.3" />
      <path d="M4 5v5h5" />
      <path d="M12 9v6M10 13h3a1.5 1.5 0 000-3h-2a1.5 1.5 0 000 3" />
    </svg>
  ),
  leaf: ({ className }: IconProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke} className={cn("h-7 w-7", className)}>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
      <path d="M5 19l7-7" />
    </svg>
  ),
} as const;
