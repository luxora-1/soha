"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type AmbientVideoProps = {
  sources: Array<{ src: string; type: string }>;
  poster?: string;
  className?: string;
};

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function readEnabled(): boolean {
  const reduce = window.matchMedia(QUERY).matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !reduce && !saveData;
}

/**
 * Muted, looping, decorative background video. Plays only when the viewer
 * has not asked for reduced motion and is not on a data-saver connection;
 * otherwise the still underneath stays visible. Renders nothing on the
 * server so there is no hydration mismatch.
 */
export function AmbientVideo({ sources, poster, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const enabled = useSyncExternalStore(subscribe, readEnabled, () => false);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    ref.current.play().catch(() => {
      /* autoplay blocked: the still underneath stays visible */
    });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
