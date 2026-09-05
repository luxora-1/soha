"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

type SplitWordsProps = {
  text: string;
  /** Seconds before the first word. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  className?: string;
};

/**
 * A headline whose words rise into place one after another on mount. Each
 * word is an inline-block span with a real space between them, so the line
 * wraps and reads normally; assistive technology sees the plain heading.
 */
export function SplitWords({ text, delay = 0, stagger = 0.07, className }: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="contents">
          <motion.span
            data-fade-up=""
            data-delay={Math.round((delay + i * stagger) * 1000)}
            className={cn("inline-block", className)}
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
