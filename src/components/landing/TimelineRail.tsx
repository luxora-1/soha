"use client";

import { motion } from "framer-motion";

/**
 * The timeline's connecting line, drawn in once when it scrolls into view:
 * from the top on phones (where it is vertical) and from the left on wider
 * screens (where it is horizontal). Scaling from the top-left corner covers
 * both without knowing the breakpoint. `data-fade-up` opts it into the
 * site's reduced-motion and no-JavaScript rules, which show it in full.
 */
export function TimelineRail({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      data-fade-up=""
      className={className}
      style={{ transformOrigin: "top left" }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}
