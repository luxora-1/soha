"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article" | "span" | "p";

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
} as const;

type FadeUpProps = {
  as?: Tag;
  /** Seconds. Use small increments (0.1) to stagger siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fade-up on scroll: 40px offset, 0.5s ease-out, plays once when the element
 * enters the viewport.
 *
 * Reduced motion: the props are deliberately identical on server and client
 * (switching components after hydration leaves the server-rendered
 * `opacity: 0` in the DOM). Instead, `globals.css` forces `[data-fade-up]`
 * elements visible under `prefers-reduced-motion`, and `MotionProvider`
 * tells Framer to honour the user's setting.
 */
export function FadeUp({
  as = "div",
  delay = 0,
  className,
  children,
}: FadeUpProps) {
  const Component = tags[as];

  return (
    <Component
      data-fade-up=""
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </Component>
  );
}
