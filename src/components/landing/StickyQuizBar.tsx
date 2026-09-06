import { QuizCTA } from "@/components/landing/QuizCTA";
import { landingContent } from "@/content/landing";

/**
 * Bottom bar on phones with the quiz CTA. The motion script springs it up once
 * the hero has scrolled past. It ships hidden and inert (see globals.css for the
 * no-JavaScript and pre-motion states) and carries no CSS transform of its own:
 * GSAP reads percentage translates back as pixels, so the offset is set in JS.
 */
export function StickyQuizBar() {
  return (
    <div
      data-sticky=""
      aria-hidden="true"
      inert
      className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="rounded-full bg-base/90 p-1.5 shadow-lift backdrop-blur-md">
        <QuizCTA location="sticky" label={landingContent.sticky.label} className="w-full" />
      </div>
    </div>
  );
}
