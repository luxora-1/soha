import { track } from "@vercel/analytics";

/**
 * Custom analytics events. Page views are recorded automatically by Vercel
 * Analytics; these are the named events on top of that.
 *
 *  landing_view      a landing page rendered (fired once per page load)
 *  waitlist_submit   the landing page's conversion: an email joined the waitlist
 */
export type AnalyticsEvent = "landing_view" | "waitlist_submit";

export type AnalyticsProps = Record<string, string | number | boolean | null>;

/**
 * The one place events leave the site. Vercel Analytics is wired today and is
 * gated by NEXT_PUBLIC_ANALYTICS=on, like the <Analytics /> component in the
 * root layout. Add further destinations (Meta Pixel, GA4, …) inside this
 * function so every event reaches all of them.
 */
export function trackEvent(name: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${name}`, props);
  }
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "on") return;
  track(name, props);
}
