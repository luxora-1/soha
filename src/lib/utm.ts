/**
 * UTM capture for ad landing pages.
 *
 * Parameters are read from the URL on arrival and remembered for the tab
 * (sessionStorage) so they survive in-page navigation and reloads, then sent
 * with the conversion event and the waitlist submission.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "soha:utm";
const MAX_LENGTH = 200;

/** Keeps only the known keys, as trimmed strings of bounded length. */
export function sanitizeUtm(input: unknown): UtmParams {
  const out: UtmParams = {};
  if (typeof input !== "object" || input === null) return out;
  for (const key of UTM_KEYS) {
    const value = (input as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) out[key] = value.trim().slice(0, MAX_LENGTH);
  }
  return out;
}

export function utmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const raw: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) raw[key] = value;
  }
  return sanitizeUtm(raw);
}

export function hasUtm(utm: UtmParams): boolean {
  return Object.keys(utm).length > 0;
}

/**
 * Client only. Returns the UTM parameters for this visit: from the current
 * URL when present (and remembers them), otherwise from what was remembered
 * earlier in this tab. Empty when neither has any.
 */
export function captureUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  const fromUrl = utmFromSearch(window.location.search);
  if (hasUtm(fromUrl)) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      /* storage unavailable (private mode, quota): the URL still carries them */
    }
    return fromUrl;
  }
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return sanitizeUtm(JSON.parse(stored));
  } catch {
    /* ignore malformed or unavailable storage */
  }
  return {};
}

/** UTM parameters as flat analytics properties (only the keys that are set). */
export function utmToProps(utm: UtmParams): Record<string, string> {
  const props: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = utm[key];
    if (value) props[key] = value;
  }
  return props;
}
