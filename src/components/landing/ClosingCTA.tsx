import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { Container } from "@/components/ui/Container";
import { LANDING_PAGE_ID, landingContent } from "@/content/landing";

/**
 * Full-width closing panel. The waitlist form is open here — one field, one
 * button — and is the target of the header's CTA (#waitlist).
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
          <WaitlistForm
            page={LANDING_PAGE_ID}
            location="closing"
            label={closing.cta}
            tone="primary"
            className="mx-auto mt-10 max-w-xl"
          />
          <p className="mt-6 text-caption text-on-primary/70">{closing.helper}</p>
        </div>
      </Container>
    </section>
  );
}
