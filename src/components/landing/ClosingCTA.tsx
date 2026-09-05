import { QuizCTA } from "@/components/landing/QuizCTA";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { Container } from "@/components/ui/Container";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";

/**
 * Full-width closing panel: the quiz button, then the open waitlist form for
 * anyone who'd rather just leave an email. Target of the "#waitlist" links.
 */
export function ClosingCTA() {
  const { closing } = landingContent;

  return (
    <section id="waitlist" aria-labelledby="closing-heading" className="scroll-mt-20 bg-primary text-on-primary">
      <Container className="py-section lg:py-section-lg">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="closing-heading" className="text-on-primary">
            {closing.headline}
          </h2>
          <p className="mt-5 text-body-lg text-on-primary/80">{closing.subhead}</p>
          <QuizCTA location="closing" variant="inverse" className="mt-10 w-full sm:w-auto" />
          <p className="mt-8 font-sans text-eyebrow uppercase tracking-eyebrow text-on-primary/70">{closing.or}</p>
          <WaitlistForm page={LANDING_PAGE_ID} location="closing" label={landingContent.waitlist.success.headline ? "Join the waitlist" : "Join"} tone="primary" className="mx-auto mt-4 max-w-xl" />
          <p className="mt-6 text-caption text-on-primary/70">{closing.helper}</p>
        </div>
      </Container>
    </section>
  );
}
