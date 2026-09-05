import type { ReactNode } from "react";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";

/**
 * Stripped shell for standalone ad landing pages: skip link, wordmark-and-CTA
 * header, main, compact footer. No site navigation or announcement bar.
 */
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LandingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
