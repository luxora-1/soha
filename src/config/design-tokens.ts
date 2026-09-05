/**
 * Soha colour palette — the single source of truth.
 * Consumed by tailwind.config.ts (utilities) and by app metadata (theme colour).
 *
 * Warm-neutral only. No pure white, no pure black, no clinical blues, no
 * wellness greens.
 */
export const palette = {
  base: "#FDFBF8", // warm off-white — primary background
  alt: "#F5EFE8", // soft sand — alternating sections
  accentSoft: "#E8DDD3", // muted clay — cards / dividers
  ink: "#2A2724", // near-black warm — body text
  inkMuted: "#6B655E", // secondary text
  brand: "#7C6A5A", // deep warm taupe — primary CTA
  brandHover: "#635447",
} as const;
