import { CheckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * What Estrada supports: a dark panel with a warm glow, curved into the
 * section above, the lifestyle photo beside the list. Every benefit is
 * <Unverified>.
 */
export function Supports() {
  const { supports, quizCta } = landingContent;

  return (
    <section
      aria-labelledby="supports-heading"
      className="relative isolate -mt-8 overflow-hidden rounded-t-[2.5rem] bg-ink text-on-ink md:rounded-t-[3.5rem]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-glow" />
      <Grain className="-z-10 opacity-[0.22] mix-blend-screen" />
      <Container className="py-section lg:py-section-lg">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeUp className="lg:col-span-5">
            <ImageSlot {...slot(supports.slot)} sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-lift" />
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h2 id="supports-heading" className="text-on-ink">
              {supports.headline.lead} <em className="italic text-accent-soft">{supports.headline.accent}</em>
            </h2>
            <p className="mt-6 text-body-lg text-on-ink/85">{supports.lead}</p>
            <ul className="mt-4 space-y-3">
              {supports.items.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-body text-on-ink">
                  <CheckIcon className="mt-0.5 text-accent-soft" />
                  <Unverified note={`benefit: ${item.verify}`}>{item.text}</Unverified>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <QuizCTA location="supports" label={quizCta.fit} variant="inverse" className="w-full sm:w-auto" />
              <p className="text-caption text-on-ink/70">{quizCta.helper}</p>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
