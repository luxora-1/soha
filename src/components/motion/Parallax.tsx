"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type ParallaxProps = {
  /** Pixels the block drifts upward over the first 900px of scrolling. */
  distance?: number;
  className?: string;
  children: ReactNode;
};

/** A block that lags the page slightly as it scrolls, for the hero photograph. Off under reduced motion. */
export function Parallax({ distance = 48, className, children }: ParallaxProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, -distance]);
  return (
    <motion.div style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
