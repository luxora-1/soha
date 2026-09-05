"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article" | "span" | "p" | "figure" | "ul";

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
  figure: motion.figure,
  ul: motion.ul,
} as const;

export type FadeUpVariant = "up" | "fade" | "scale" | "left" | "right";

/** Expo-out: fast start, long soft landing. The landing page's motion curve. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const hidden: Record<FadeUpVariant, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 32 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.96 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
};
const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

type FadeUpProps = {
  as?: Tag;
  /** How the element arrives. `up` is the default; `scale` suits photographs. */
  variant?: FadeUpVariant;
  /** Seconds. Use small increments (0.08) to stagger siblings. */
  delay?: number;
  duration?: number;
  /** Play on mount rather than on scroll; for content that is on screen at load. */
  immediate?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Reveal on scroll (or on mount with `immediate`): a short rise, scale or
 * slide with a fade, playing once.
 *
 * Reduced motion: the props are deliberately identical on server and client
 * (switching components after hydration leaves the server-rendered
 * `opacity: 0` in the DOM). Instead, `globals.css` forces `[data-fade-up]`
 * elements visible under `prefers-reduced-motion`, and `MotionProvider`
 * tells Framer to honour the user's setting. `data-delay` (ms) lets a
 * script-free snapshot of the page reproduce the stagger.
 */
export function FadeUp({
  as = "div",
  variant = "up",
  delay = 0,
  duration = 0.7,
  immediate = false,
  className,
  children,
}: FadeUpProps) {
  const Component = tags[as];
  const transition = { duration, ease: EASE_OUT, delay };

  if (immediate) {
    return (
      <Component data-fade-up="" data-delay={Math.round(delay * 1000)} className={className} initial={hidden[variant]} animate={shown} transition={transition}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      data-fade-up=""
      data-delay={Math.round(delay * 1000)}
      className={className}
      initial={hidden[variant]}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={transition}
    >
      {children}
    </Component>
  );
}
