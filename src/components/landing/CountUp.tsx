"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  /** The final figure as shown, e.g. "91%", "$99", "1,200+". Prefix and suffix are kept. */
  value: string;
  /** Seconds to wait once in view; use to stagger siblings. */
  delay?: number;
  duration?: number;
  className?: string;
};

/** prefix, digits (with optional grouping commas and decimals), suffix */
const NUMBER = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/**
 * Counts a figure up from zero the first time it scrolls into view.
 *
 * Renders the final value on the server, so the page reads correctly without
 * JavaScript and in the first frame; the animation writes to the text node
 * directly rather than through state. Skipped entirely when the viewer has
 * asked for reduced motion. Wrap the figure in <Unverified> as usual: the
 * mark contains this span.
 */
export function CountUp({ value, delay = 0, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceMotion) return;
    const match = NUMBER.exec(value);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;
    const decimals = (digits.split(".")[1] ?? "").length;
    const grouped = digits.includes(",");
    const format = (n: number) =>
      grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);

    const controls = animate(0, target, {
      delay,
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = `${prefix}${format(latest)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
