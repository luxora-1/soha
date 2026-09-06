import { QuizCTA } from "@/components/landing/QuizCTA";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";

/**
 * Full-width closing panel: the quiz button, then the open waitlist form for
 * anyone who'd rather just leave an email. Target of the "#waitlist" links.
 */
export function ClosingCTA() {
  const { closing } = landingContent;

  return (
    <section id="waitlist" aria-labelledby="closing-heading" className="relative isolate -mt-8 overflow-hidden scroll-mt-20 rounded-t-[2rem] bg-panel text-on-panel md:rounded-t-[2.5rem]">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_70%_20%,rgb(var(--accent-rgb)/0.4),transparent_70%)]" />
      <Grain className="-z-10 opacity-[0.18] mix-blend-screen" />
      <Container className="py-section lg:py-section-lg">
        <div data-reveal="" className="mx-auto max-w-2xl text-center">
          <h2 id="closing-heading" className="text-on-panel">
            {closing.headline}
          </h2>
          <p className="mt-5 text-body-lg text-on-panel/80">{closing.subhead}</p>
          <QuizCTA location="closing" variant="inverse" className="mt-10 w-full sm:w-auto" />
          <p className="mt-8 text-base text-on-panel/70">{closing.or}</p>
          <WaitlistForm page={LANDING_PAGE_ID} location="closing" label="Join the waitlist" tone="primary" className="mx-auto mt-4 max-w-xl" />
          <p className="mt-6 text-caption text-on-panel/70">{closing.helper}</p>
        </div>
      </Container>
    </section>
  );
}
