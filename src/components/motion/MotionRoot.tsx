"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { initMotion } from "@/lib/motion/orchestrate";

gsap.registerPlugin(useGSAP);

/**
 * Mounts the site's motion once per page. Everything it animates is declared
 * with data attributes in the (server) components; see lib/motion/orchestrate.ts.
 * Re-runs on route changes so new pages get their reveals, and reverts the
 * previous page's work first.
 */
export function MotionRoot() {
  const pathname = usePathname();
  useGSAP(
    () => {
      const cleanup = initMotion(document);
      return () => cleanup();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
  return null;
}
