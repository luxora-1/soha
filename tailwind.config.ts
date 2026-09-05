import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import {
  cssVariablesFor,
  defaultPalette,
  devTokens,
  paletteOrder,
  rgbTriplet,
} from "./src/config/design-tokens";

/**
 * Soha design system.
 *
 * Every visual decision on the site should trace back to a token in this file.
 * Aesthetic reference: modern women's-health DTC — elevated, warm, editorial.
 * Not a medical portal, not a pharmacy site, not crunchy-wellness.
 *
 * Colour: every utility reads a CSS custom property emitted by the palette
 * plugin at the bottom of this file (see src/config/design-tokens.ts). The
 * palette is written to :root and selected by `data-palette` on <html>. No
 * hex values live here or in any component — only in design-tokens.ts.
 *
 * Utility → token map:
 *   bg-base / border-base / text-on-*      --bg
 *   bg-alt, bg-surface                     --surface
 *   accent-soft                            --accent-soft
 *   accent                                 --accent
 *   brand, primary (+ -hover)              --primary (+ derived hover)
 *   ink, ink-muted                         --ink (+ derived muted)
 *
 * Other rules encoded here:
 *  - Tailwind's default palette is removed so `bg-white`, `text-blue-500`
 *    etc. simply do not exist.
 *  - Serif headings at weight 400 with tight tracking; sans body.
 *  - Fluid type scale (mobile → desktop) via clamp(); body never drops
 *    below 16px for the 45+ audience.
 *  - Cards are rounded-2xl / rounded-tile, buttons rounded-full. The
 *    marketing pages use hairline borders; the landing page uses soft
 *    shadows (shadow-soft) and no borders.
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

/** A colour utility that reads a palette variable and supports `/opacity` modifiers. */
const token = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

/** Emits each palette as a CSS custom-property set on :root / [data-palette]. */
const palettePlugin = plugin(({ addBase }) => {
  const rules: Record<string, Record<string, string>> = {};
  for (const id of paletteOrder) {
    const selector =
      id === defaultPalette ? `:root, :root[data-palette="${id}"]` : `:root[data-palette="${id}"]`;
    rules[selector] = cssVariablesFor(id);
  }
  // Development-only marker colour; not part of any palette.
  rules[":root"] = { "--unverified-rgb": rgbTriplet(devTokens.unverified) };
  addBase(rules);
});

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
      inherit: "inherit",
      "accent-soft": token("accent-soft"),
      accent: token("accent"),
      ink: {
        DEFAULT: token("ink"),
        muted: token("ink-muted"),
      },
      /** `brand` is the original utility name; `primary` is the token name. Same variable. */
      brand: {
        DEFAULT: token("primary"),
        hover: token("primary-hover"),
      },
      primary: {
        DEFAULT: token("primary"),
        hover: token("primary-hover"),
      },
      /** Yellow highlight behind <Unverified> claims. Development tooling only. */
      unverified: token("unverified"),
    },
    /**
     * `bg-base` / `bg-alt` live only on backgroundColor so that `text-base`
     * keeps its Tailwind meaning (16px font size) instead of colliding with a
     * colour called "base". `surface` is the token-named twin of `alt`.
     */
    backgroundColor: ({ theme }) => ({
      ...theme("colors"),
      base: token("bg"),
      alt: token("surface"),
      surface: token("surface"),
    }),
    textColor: ({ theme }) => ({
      ...theme("colors"),
      /** Light text for use on `bg-brand` / `bg-primary` and `bg-ink` surfaces. */
      "on-brand": token("bg"),
      "on-primary": token("bg"),
      "on-ink": token("bg"),
    }),
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: token("accent-soft"),
      base: token("bg"),
    }),
    ringColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: token("primary"),
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: token("bg"),
      base: token("bg"),
      alt: token("surface"),
    }),
    outlineColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: token("primary"),
      /** Light focus ring for dark surfaces (footer, dark panels). */
      base: token("bg"),
      alt: token("surface"),
    }),
    /**
     * Shadows are ink-tinted so they follow the palette. `subtle` is the
     * marketing pages' barely-there option; `soft` and `lift` are the landing
     * page's card shadows (it uses no borders).
     */
    boxShadow: {
      none: "none",
      subtle: "0 1px 2px 0 rgb(var(--ink-rgb) / 0.04)",
      soft: "0 1px 2px rgb(var(--ink-rgb) / 0.04), 0 18px 40px -24px rgb(var(--ink-rgb) / 0.22)",
      lift: "0 2px 4px rgb(var(--ink-rgb) / 0.05), 0 28px 56px -28px rgb(var(--ink-rgb) / 0.3)",
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
        /** display — 44px → 80px, serif. Landing hero only. */
        display: [
          fluid(44, 80),
          { lineHeight: "1.04", letterSpacing: "-0.025em", fontWeight: "400" },
        ],
        /** h2 — 30px → 44px, serif, weight 400. */
        h2: [
          fluid(30, 44),
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        /** h3 — 20px → 24px, sans, weight 500. */
        h3: [fluid(20, 24), { lineHeight: "1.3", fontWeight: "500" }],
        /** stat — 48px → 72px, serif numerals for outcome tiles and prices. */
        stat: [fluid(48, 72), { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "400" }],
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
        /** Select chevron, drawn in the palette's muted ink (one data-URI per palette, see design-tokens.ts). */
        chevron: "var(--chevron)",
        /** Film grain overlay for tiles and panels (use with mix-blend + low opacity). */
        grain: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
        )}")`,
        /** Warm placeholder gradient for image tiles. */
        "tile-placeholder":
          "linear-gradient(160deg, rgb(var(--accent-soft-rgb)) 0%, rgb(var(--accent-rgb) / 0.55) 45%, rgb(var(--primary-rgb)) 130%)",
        /** Bottom-up fade so light text reads over any photo. */
        "tile-fade":
          "linear-gradient(to top, rgb(var(--ink-rgb) / 0.82) 0%, rgb(var(--ink-rgb) / 0.35) 45%, rgb(var(--ink-rgb) / 0) 75%)",
        /** Soft glow for dark panels. */
        glow: "radial-gradient(55% 60% at 72% 35%, rgb(var(--primary-rgb) / 0.55) 0%, rgb(var(--primary-rgb) / 0) 70%)",
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
        /** A duplicated row gliding left by half its width loops seamlessly. */
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        /** CSS-only fallback for the FadeUp motion wrapper. 0.5s ease-out. */
        "fade-up": "fade-up 0.5s ease-out both",
        /** Certification marks on the landing page. */
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [palettePlugin],
};

export default config;
