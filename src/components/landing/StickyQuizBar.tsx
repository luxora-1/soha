"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { landingContent } from "@/content/landing";

/** Bottom bar on phones with the quiz CTA. Springs up once the hero has scrolled past. */
export function StickyQuizBar() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setShown(latest > 640));

  return (
    <motion.div
      aria-hidden={!shown}
      initial={false}
      animate={{ y: shown ? 0 : "115%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
      className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="rounded-full bg-base/90 p-1.5 shadow-lift backdrop-blur-md">
        <QuizCTA location="sticky" label={landingContent.sticky.label} className="w-full" />
      </div>
    </motion.div>
  );
}
