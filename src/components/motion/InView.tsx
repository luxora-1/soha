"use client";

import { useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

type Margin = NonNullable<Parameters<typeof useInView>[1]>["margin"];

type InViewProps = {
  as?: "div" | "ul" | "section" | "figure" | "span";
  className?: string;
  /** Accessible name, for lists. */
  label?: string;
  margin?: Margin;
  children: ReactNode;
};

/**
 * Marks itself with `data-inview` the first time it scrolls into view, so
 * CSS in the children can key their animations off it, e.g.
 * `group-data-[inview]:animate-draw`. Pure CSS animation with a tiny
 * JavaScript gate: the page renders the resting state without scripts, and
 * a static snapshot can set the same attribute itself.
 */
export function InView({ as = "div", className, label, margin = "0px 0px -15% 0px", children }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const Component = as as ElementType;
  return (
    <Component ref={ref} className={className} aria-label={label} data-inview-gate="" data-inview={inView ? "" : undefined}>
      {children}
    </Component>
  );
}
