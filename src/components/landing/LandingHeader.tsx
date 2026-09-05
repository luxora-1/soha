"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/**
 * Stripped header for ad landing pages: the wordmark and the quiz button.
 * No navigation, so paid traffic has nowhere to leak; the wordmark is not a
 * link for the same reason. Full width at the top of the page; once the
 * reader scrolls it draws in to a floating translucent pill, with a hairline
 * along the top showing how far down the page they are.
 */
export function LandingHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 32));

  return (
    <header className="sticky top-0 z-40">
      <ScrollProgress />
      <div className={cn("transition-[padding] duration-300 ease-out motion-reduce:transition-none", scrolled ? "px-3 pt-2 md:px-6" : "px-0 pt-0")}>
        <div
          className={cn(
            "mx-auto box-content transition-[border-radius,box-shadow,background-color,max-width] duration-300 ease-out motion-reduce:transition-none",
            scrolled ? "max-w-content rounded-full bg-base/85 shadow-soft backdrop-blur-md" : "max-w-none bg-base/85 backdrop-blur-md",
          )}
        >
          <div className={cn("mx-auto flex max-w-content items-center justify-between gap-4 transition-[height] duration-300 ease-out motion-reduce:transition-none", scrolled ? "h-16 px-5 md:px-6" : "h-nav px-6 md:px-8")}>
            <span className="font-serif text-[1.75rem] leading-none tracking-heading text-ink">
              <span className="sr-only">{siteConfig.name}</span>
              <span aria-hidden="true">{siteConfig.name}</span>
            </span>
            <QuizCTA location="header" label={landingContent.header.cta} size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
