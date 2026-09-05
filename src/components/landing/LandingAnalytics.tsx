"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureUtm, utmToProps } from "@/lib/utm";

/**
 * Fires the landing page's own view event (distinct from the homepage's
 * automatic page view) once per load, with the UTM parameters attached, and
 * remembers those parameters for the tab so the conversion event and the
 * waitlist submission carry them too.
 */
export function LandingAnalytics({ page }: { page: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const utm = captureUtm();
    trackEvent("landing_view", { page, path: window.location.pathname, ...utmToProps(utm) });
  }, [page]);

  return null;
}
