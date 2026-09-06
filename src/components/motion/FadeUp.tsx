import type { ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article" | "span" | "p" | "figure" | "ul";

type FadeUpProps = {
  as?: Tag;
  /** Seconds; siblings revealed together are staggered by the orchestrator, so this is rarely needed. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Marks a block to fade in with a short rise the first time it scrolls into
 * view. A server component: it only writes `data-reveal`; the motion itself
 * lives in lib/motion/orchestrate.ts, mounted once by MotionRoot. Without
 * JavaScript or under reduced motion the block simply renders.
 */
export function FadeUp({ as: Tag = "div", delay = 0, className, children }: FadeUpProps) {
  return (
    <Tag data-reveal="" data-delay={delay ? Math.round(delay * 1000) : undefined} className={className}>
      {children}
    </Tag>
  );
}
