"use client";

import { useEffect, useState } from "react";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/** Bottom bar on phones with the quiz CTA, shown once the hero has scrolled past. */
export function StickyQuizBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="rounded-full bg-base/90 p-1.5 shadow-lift backdrop-blur-md">
        <QuizCTA location="sticky" label={landingContent.sticky.label} className="w-full" />
      </div>
    </div>
  );
}
