"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/** A hairline along the top of the header that fills as the page is read. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn("pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-accent", className)}
    />
  );
}
