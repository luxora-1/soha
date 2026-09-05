import { QuizCTA } from "@/components/landing/QuizCTA";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { FadeUp } from "@/components/motion/FadeUp";
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
    <section id="waitlist" aria-labelledby="closing-heading" className="relative isolate -mt-8 overflow-hidden scroll-mt-20 rounded-t-[2.5rem] bg-primary text-on-primary md:rounded-t-[3.5rem]">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_70%_20%,rgb(var(--accent-rgb)/0.4),transparent_70%)]" />
      <span aria-hidden="true" className="absolute -left-32 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-ink/30 blur-3xl" />
      <Grain className="-z-10 opacity-[0.18] mix-blend-screen" />
      <Container className="py-section lg:py-section-lg">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 id="closing-heading" className="text-on-primary">
              {closing.headline}
            </h2>
            <p className="mt-5 text-body-lg text-on-primary/80">{closing.subhead}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <QuizCTA location="closing" variant="inverse" className="mt-10 w-full sm:w-auto" />
            <p className="mt-8 font-sans text-eyebrow uppercase tracking-eyebrow text-on-primary/70">{closing.or}</p>
            <WaitlistForm page={LANDING_PAGE_ID} location="closing" label="Join the waitlist" tone="primary" className="mx-auto mt-4 max-w-xl" />
            <p className="mt-6 text-caption text-on-primary/70">{closing.helper}</p>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
