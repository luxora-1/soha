import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { unverifiedMode } from "@/lib/unverified";

type UnverifiedProps = {
  children: ReactNode;
  /**
   * What has to be verified — "review count", "shipping policy",
   * "8-week outcome: sleep". Shown in the tooltip and the build error, and
   * listed in UNVERIFIED.md.
   */
  note: string;
  className?: string;
};

/**
 * Wraps a claim that has not been verified against a source: a statistic,
 * review count, rating, price, delivery estimate, guarantee term,
 * certification, or any statement about what the product does clinically.
 *
 * Development and preview builds render the text with a yellow highlight so
 * every placeholder is visible in the layout. A production build throws, and
 * because the landing page is prerendered that fails `next build`
 * (see src/lib/unverified.ts for the exact rule and the override).
 *
 * Server component: keep it out of "use client" files. Client components
 * that need highlighted copy receive it as ReactNode props instead.
 */
export function Unverified({ children, note, className }: UnverifiedProps) {
  if (unverifiedMode() === "throw") {
    throw new Error(
      `<Unverified> claim in a production build: "${note}". Every claim wrapped in <Unverified> must be replaced with a verified figure before launch — see UNVERIFIED.md. To build with placeholders (a preview), set ALLOW_UNVERIFIED=1; Vercel Preview deployments are allowed automatically.`,
    );
  }

  return (
    <mark
      data-unverified={note}
      title={`Unverified — ${note}`}
      className={cn(
        "-mx-[0.1em] rounded-[0.25em] bg-unverified/80 px-[0.1em] text-ink box-decoration-clone",
        className,
      )}
    >
      {children}
    </mark>
  );
}
