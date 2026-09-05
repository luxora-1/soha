"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronIcon } from "@/components/landing/icons";
import { cn } from "@/lib/cn";

type CarouselProps = {
  /** Slides, rendered on the server and passed in. */
  items: readonly ReactNode[];
  /** Accessible name of the slide list. */
  label: string;
  /** Width classes per slide, e.g. "w-full" or "w-[82%] md:w-[calc((100%-2rem)/3)]". */
  itemClassName?: string;
  className?: string;
  /** Milliseconds between automatic advances; omit for manual only. */
  autoplayMs?: number;
  arrows?: boolean;
  dots?: boolean;
  /** Classes on the controls row, e.g. "md:hidden" when every slide fits from md. */
  controlsClassName?: string;
  /** Let the track bleed to the screen edge on phones. */
  bleed?: boolean;
};

const REDUCE = "(prefers-reduced-motion: reduce)";

/**
 * Scroll-snap carousel. The track is a real horizontal scroller, so swiping,
 * trackpads and keyboard scrolling all work without JavaScript; the arrows,
 * dots and optional autoplay are conveniences layered on top. Autoplay runs
 * only while the carousel is on screen and not hovered or focused, and never
 * when the viewer prefers reduced motion.
 */
export function Carousel({
  items,
  label,
  itemClassName = "w-full",
  className,
  autoplayMs,
  arrows = true,
  dots = true,
  controlsClassName,
  bleed = false,
}: CarouselProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const frame = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const count = items.length;

  const paddingLeft = (track: HTMLElement) => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;

  const slideTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const next = ((target % count) + count) % count;
      const child = track.children[next] as HTMLElement | undefined;
      if (!child) return;
      const reduce = window.matchMedia(REDUCE).matches;
      track.scrollTo({ left: child.offsetLeft - paddingLeft(track), behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  // Keep `index` in step with wherever the user has scrolled.
  const onScroll = () => {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const track = trackRef.current;
      if (!track) return;
      const origin = track.scrollLeft + paddingLeft(track);
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      Array.from(track.children).forEach((child, i) => {
        const distance = Math.abs((child as HTMLElement).offsetLeft - origin);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setIndex(best);
    });
  };

  // Autoplay only while visible.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !autoplayMs || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoplayMs]);

  useEffect(() => {
    if (!autoplayMs || paused || !inView || count < 2) return;
    if (window.matchMedia(REDUCE).matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") slideTo(index + 1);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayMs, paused, inView, index, count, slideTo]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        aria-label={label}
        onScroll={onScroll}
        className={cn(
          "relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6",
          bleed && "-mx-6 px-6 scroll-px-6 md:mx-0 md:px-0 md:scroll-px-0",
        )}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={cn("shrink-0 snap-start", itemClassName)}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            {item}
          </li>
        ))}
      </ul>

      {(arrows || dots) && count > 1 && (
        <div className={cn("mt-5 flex items-center justify-center gap-4", controlsClassName)}>
          {arrows && (
            <button
              type="button"
              onClick={() => slideTo(index - 1)}
              aria-label="Previous slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-base text-ink shadow-soft hover:bg-surface"
            >
              <ChevronIcon className="rotate-180" />
            </button>
          )}
          {dots && (
            <ol className="flex items-center gap-2" aria-label={`${label} slides`}>
              {items.map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => slideTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className="inline-flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                        i === index ? "w-6 bg-primary" : "w-2 bg-ink/25",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
          )}
          {arrows && (
            <button
              type="button"
              onClick={() => slideTo(index + 1)}
              aria-label="Next slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-base text-ink shadow-soft hover:bg-surface"
            >
              <ChevronIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
