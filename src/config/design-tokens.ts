/**
 * Soha colour palettes — the single source of truth.
 *
 * Five candidate schemes are defined here. Each becomes a set of CSS custom
 * properties (see the palette plugin in tailwind.config.ts) selected by a
 * `data-palette` attribute on <html>. Every Tailwind colour utility on the
 * site reads from those variables, so no component carries a raw hex value
 * and switching the whole site to another scheme is changing
 * `defaultPalette` below. PALETTES.md documents the five with notes.
 *
 * Token roles:
 *   --bg           page ground
 *   --surface      alternating sections, cards, fields
 *   --accent-soft  tints, dividers, placeholder blocks
 *   --accent       small emphasis: stars, stat marks, verified ticks
 *   --primary      buttons, dark panels, headline colour on tinted panels
 *   --ink          text
 *
 * Two tokens are derived from the six above so they follow each palette
 * automatically: `ink-muted` (secondary text) and `primary-hover`.
 */

export type PaletteId = "a" | "b" | "c" | "d" | "e";

export type PaletteTokens = {
  bg: string;
  surface: string;
  accentSoft: string;
  accent: string;
  primary: string;
  ink: string;
};

export type Palette = {
  id: PaletteId;
  /** Display name, e.g. "Warm Clay". */
  name: string;
  /** What the scheme is going for, so judgment calls can be made within it. */
  note: string;
  tokens: PaletteTokens;
};

export const palettes: Record<PaletteId, Palette> = {
  a: {
    id: "a",
    name: "Warm Clay",
    note: "The current brand direction. Warm, earthy, apothecary.",
    tokens: {
      bg: "#F7F3EC",
      surface: "#EFE7DA",
      accentSoft: "#C9A896",
      accent: "#B5643F",
      primary: "#6E2639",
      ink: "#2E2320",
    },
  },
  b: {
    id: "b",
    name: "Clinical Calm",
    note: "Close to what the competitors use. Cool, soft, medical. Safe and proven in this category, but it looks like everyone else.",
    tokens: {
      bg: "#FBFBFD",
      surface: "#F0F2F9",
      accentSoft: "#C7CDE8",
      accent: "#6B76C4",
      primary: "#3B3F80",
      ink: "#1F2233",
    },
  },
  c: {
    id: "c",
    name: "Sage Apothecary",
    note: "Muted green and deep ink. Calm and botanical without tipping into wellness cliché. Reads less gendered than most of the category.",
    tokens: {
      bg: "#F6F5F0",
      surface: "#E8EAE1",
      accentSoft: "#B9C4B0",
      accent: "#7A8B6F",
      primary: "#2C3A34",
      ink: "#23291F",
    },
  },
  d: {
    id: "d",
    name: "Ink & Amber",
    note: "Near-black type on warm off-white, amber only as accent. High contrast and editorial. The most differentiated of the five and the most dependent on good photography.",
    tokens: {
      bg: "#FAF8F5",
      surface: "#F0EBE3",
      accentSoft: "#E0C9A0",
      accent: "#C4873D",
      primary: "#1C1A17",
      ink: "#1C1A17",
    },
  },
  e: {
    id: "e",
    name: "Plum & Blush",
    note: "Deep plum with dusty rose. Warmest and most traditionally feminine. Risks looking like a supplement brand if the spacing isn't disciplined.",
    tokens: {
      bg: "#FCF8F8",
      surface: "#F5EBEC",
      accentSoft: "#DCC0C6",
      accent: "#A85C72",
      primary: "#4A2231",
      ink: "#2B1A20",
    },
  },
};

/** Order the development switcher cycles through. */
export const paletteOrder: readonly PaletteId[] = ["a", "b", "c", "d", "e"];

/**
 * THE ONE DEFAULT. Change this letter and every page switches scheme.
 * The <html> element carries it as `data-palette`, and the matching token
 * set is also written to :root so the site is styled before hydration.
 */
export const defaultPalette: PaletteId = "a";

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && value in palettes;
}

/* ---- colour helpers (build-time only; used by the Tailwind plugin) ------ */

type Rgb = readonly [number, number, number];

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/** "247 243 236" — the space-separated channels Tailwind's `rgb(… / <alpha-value>)` needs. */
export function rgbTriplet(hex: string): string {
  return hexToRgb(hex).join(" ");
}

/** Linear mix of two hex colours; `t` is the share of `b`. */
export function mixHex(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex([
    ca[0] + (cb[0] - ca[0]) * t,
    ca[1] + (cb[1] - ca[1]) * t,
    ca[2] + (cb[2] - ca[2]) * t,
  ]);
}

/** Relative luminance (WCAG), 0 = black, 1 = white. */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export type DerivedTokens = {
  /** Secondary text: ink softened toward the page ground. Stays ≥ 4.5:1 on --bg. */
  inkMuted: string;
  /** Hover state for --primary: darkened toward ink, or lifted toward the ground when primary is already near-black. */
  primaryHover: string;
};

export function deriveTokens(t: PaletteTokens): DerivedTokens {
  return {
    inkMuted: mixHex(t.ink, t.bg, 0.32),
    primaryHover: luminance(t.primary) < 0.03 ? mixHex(t.primary, t.bg, 0.14) : mixHex(t.primary, t.ink, 0.22),
  };
}

/**
 * The full CSS custom-property set for one palette: each token as hex and as
 * an RGB triplet (for opacity modifiers), the derived tokens, and the select
 * chevron drawn in that palette's muted ink (data-URI SVGs cannot read
 * variables, so one is emitted per palette).
 */
export function cssVariablesFor(id: PaletteId): Record<string, string> {
  const { tokens } = palettes[id];
  const derived = deriveTokens(tokens);
  const entries: Array<[string, string]> = [
    ["bg", tokens.bg],
    ["surface", tokens.surface],
    ["accent-soft", tokens.accentSoft],
    ["accent", tokens.accent],
    ["primary", tokens.primary],
    ["ink", tokens.ink],
    ["ink-muted", derived.inkMuted],
    ["primary-hover", derived.primaryHover],
  ];
  const vars: Record<string, string> = {};
  for (const [name, hex] of entries) {
    vars[`--${name}`] = hex;
    vars[`--${name}-rgb`] = rgbTriplet(hex);
  }
  vars["--chevron"] = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='none' stroke='${encodeURIComponent(derived.inkMuted)}' stroke-width='1.5' d='M3 6l5 5 5-5'/></svg>")`;
  return vars;
}

/**
 * Development-tooling colour, deliberately outside the palettes: the yellow
 * highlight behind <Unverified> claims. Never used by product UI.
 */
export const devTokens = {
  unverified: "#FDE68A",
} as const;
