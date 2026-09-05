import type { Config } from "tailwindcss";
import { palette } from "./src/config/design-tokens";

/**
 * Soha design system.
 *
 * Every visual decision on the site should trace back to a token in this file.
 * Aesthetic reference: modern women's-health DTC — elevated, warm, editorial.
 * Not a medical portal, not a pharmacy site, not crunchy-wellness.
 *
 * Rules encoded here:
 *  - Warm-neutral palette only. No pure white, no pure black, no clinical
 *    blues, no wellness greens. Tailwind's default palette is deliberately
 *    removed so those colours cannot be reached by accident.
 *  - Serif headings at weight 400 with tight tracking; geometric sans body.
 *  - Fluid type scale (mobile → desktop) via clamp(); body never drops
 *    below 16px for the 45+ audience.
 *  - Borders instead of shadows. Cards are rounded-2xl, buttons rounded-full.
 */

/**
 * Fluid size helper. Interpolates linearly between a mobile size (at 375px)
 * and a desktop size (at 1280px), clamped at both ends. Values are in px.
 */
const fluid = (minPx: number, maxPx: number, minVw = 375, maxVw = 1280) => {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const intercept = minPx - slope * minVw;
  const r = (n: number) => Math.round(n * 10000) / 10000;
  return `clamp(${r(minPx / 16)}rem, ${r(intercept / 16)}rem + ${r(slope * 100)}vw, ${r(maxPx / 16)}rem)`;
};

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    /**
     * Full palette override (not `extend`) so `bg-white`, `text-black`,
     * `bg-blue-500`, `text-green-600` etc. simply do not exist.
     */
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "accent-soft": palette.accentSoft,
      ink: {
        DEFAULT: palette.ink,
        muted: palette.inkMuted,
      },
      brand: {
        DEFAULT: palette.brand,
        hover: palette.brandHover,
      },
    },
    /**
     * `bg-base` / `bg-alt` live only on backgroundColor so that `text-base`
     * keeps its Tailwind meaning (16px font size) instead of colliding with a
     * colour called "base".
     */
    backgroundColor: ({ theme }) => ({
      ...theme("colors"),
      base: palette.base,
      alt: palette.alt,
    }),
    textColor: ({ theme }) => ({
      ...theme("colors"),
      /** Light text for use on `bg-brand` and `bg-ink` surfaces. */
      "on-brand": palette.base,
      "on-ink": palette.base,
    }),
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: palette.accentSoft,
      base: palette.base,
    }),
    ringColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: palette.brand,
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: palette.base,
      base: palette.base,
      alt: palette.alt,
    }),
    outlineColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: palette.brand,
      /** Light focus ring for dark surfaces (footer). */
      base: palette.base,
      alt: palette.alt,
    }),
    /** Almost no shadows. One barely-there option, used sparingly if at all. */
    boxShadow: {
      none: "none",
      subtle: "0 1px 2px 0 rgb(42 39 36 / 0.04)",
    },
    extend: {
      fontFamily: {
        // Wired up through next/font in src/lib/fonts.ts
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        /** h1 — 40px → 68px, serif, weight 400. Restrained, editorial. */
        h1: [
          fluid(40, 68),
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        /** h2 — 30px → 44px, serif, weight 400. */
        h2: [
          fluid(30, 44),
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        /** h3 — 20px → 24px, sans, weight 500. */
        h3: [fluid(20, 24), { lineHeight: "1.3", fontWeight: "500" }],
        /** body — 16px → 18px, sans, line-height 1.65. Never below 16px. */
        body: [fluid(16, 18), { lineHeight: "1.65" }],
        /** body-lg — 18px → 20px, for subheads under h1/h2. */
        "body-lg": [fluid(18, 20), { lineHeight: "1.55" }],
        /** eyebrow — 12px, sans, uppercase, tracking 0.12em. */
        eyebrow: [
          "0.75rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.12em",
            fontWeight: "500",
          },
        ],
        /** caption — 16px (the body floor), for supporting text under a CTA. */
        caption: ["1rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        heading: "-0.02em",
        eyebrow: "0.12em",
      },
      lineHeight: {
        body: "1.65",
      },
      maxWidth: {
        /** Max content width for page sections. */
        content: "1200px",
        /** Narrower measure for prose / long-form copy. */
        measure: "680px",
      },
      spacing: {
        /** Vertical rhythm for sections: py-section (mobile) / lg:py-section-lg */
        section: "5rem", // 80px  == py-20
        "section-lg": "8rem", // 128px == py-32
        /** Navbar row height. */
        nav: "4.5rem", // 72px
        /** Announcement bar height. */
        bar: "2.75rem", // 44px
        /** Fixed header total (bar + nav, or nav only) — set on <html> by the layout. */
        header: "var(--header-h)",
        /** Minimum tap-target size for the 45+ audience. */
        tap: "2.75rem", // 44px
      },
      minHeight: {
        tap: "2.75rem",
      },
      minWidth: {
        tap: "2.75rem",
      },
      borderRadius: {
        card: "1rem", // == rounded-2xl
        /** Large photo tiles and full-bleed panels. */
        tile: "1.75rem",
      },
      backgroundImage: {
        /** Select chevron, drawn in ink-muted. Used with appearance-none selects. */
        chevron: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='none' stroke='${encodeURIComponent(palette.inkMuted)}' stroke-width='1.5' d='M3 6l5 5 5-5'/></svg>")`,
        /** Film grain overlay for tiles and panels (use with mix-blend + low opacity). */
        grain: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
        )}")`,
        /** Warm placeholder gradient for image tiles. */
        "tile-placeholder": `linear-gradient(160deg, ${palette.accentSoft} 0%, #D8C7B6 45%, ${palette.brand} 130%)`,
        /** Bottom-up fade so cream text reads over any photo. */
        "tile-fade": `linear-gradient(to top, rgb(42 39 36 / 0.82) 0%, rgb(42 39 36 / 0.35) 45%, rgb(42 39 36 / 0) 75%)`,
        /** Soft warm glow for dark panels. */
        glow: `radial-gradient(55% 60% at 72% 35%, rgb(124 106 90 / 0.55) 0%, rgb(124 106 90 / 0) 70%)`,
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        /** CSS-only fallback for the FadeUp motion wrapper. 0.5s ease-out. */
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
