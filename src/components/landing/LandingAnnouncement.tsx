"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronIcon } from "@/components/landing/icons";

type LandingAnnouncementProps = {
  /** Perks, server-rendered (claims come wrapped in <Unverified>). */
  messages: readonly ReactNode[];
  label: string;
};

/** Thin bar above the header cycling through perks, with arrows. Pauses on hover and under reduced motion. */
export function LandingAnnouncement({ messages, label }: LandingAnnouncementProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = messages.length;

  useEffect(() => {
    if (count < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-label={label}
      className="bg-ink text-on-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto flex h-bar max-w-content items-center justify-between gap-2 px-3 md:px-6">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + count) % count)}
          aria-label="Previous perk"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-base/10 focus-visible:outline-base"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
        </button>
        <p key={index} aria-live="polite" className="min-w-0 truncate text-center text-[0.9375rem] font-medium motion-safe:animate-fade-in">
          {messages[index]}
        </p>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          aria-label="Next perk"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-base/10 focus-visible:outline-base"
        >
          <ChevronIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
