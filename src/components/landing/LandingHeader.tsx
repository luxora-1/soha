import { QuizCTA } from "@/components/landing/QuizCTA";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing";

/**
 * Stripped header for ad landing pages: the wordmark and the quiz button.
 * No navigation, so paid traffic has nowhere to leak; the wordmark is not a
 * link for the same reason. Full width at the top of the page; once the
 * reader scrolls, the motion script sets `data-scrolled` and it draws in to a
 * floating translucent pill. A hairline along the top fills as the page is
 * read (`data-progress`).
 */
export function LandingHeader() {
  return (
    <header data-header="" className="group sticky top-0 z-40">
      <span aria-hidden="true" data-progress="" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-accent" />
      <div className="transition-[padding] duration-300 ease-out group-data-[scrolled]:px-3 group-data-[scrolled]:pt-2 md:group-data-[scrolled]:px-6 motion-reduce:transition-none">
        <div className="mx-auto box-content max-w-none bg-base/85 backdrop-blur-md transition-[border-radius,box-shadow,max-width] duration-300 ease-out group-data-[scrolled]:max-w-content group-data-[scrolled]:rounded-full group-data-[scrolled]:shadow-soft motion-reduce:transition-none">
          <div className="mx-auto flex h-nav max-w-content items-center justify-between gap-4 px-6 transition-[height,padding] duration-300 ease-out group-data-[scrolled]:h-16 group-data-[scrolled]:px-5 md:px-8 md:group-data-[scrolled]:px-6 motion-reduce:transition-none">
            <span className="font-sans text-[1.5rem] font-semibold leading-none tracking-[-0.02em] text-primary">
              <span className="sr-only">{siteConfig.name}</span>
              <span aria-hidden="true">{siteConfig.name}</span>
            </span>
            <QuizCTA location="header" label={landingContent.header.cta} size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
