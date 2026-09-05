import { GuaranteeSeal } from "@/components/landing/GuaranteeSeal";
import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { landingContent } from "@/content/landing";

/** Deep full-width guarantee panel with a turning seal and the quiz button. Terms are <Unverified>. */
export function GuaranteePanel() {
  const { guarantee, quizCta } = landingContent;

  return (
    <section aria-labelledby="guarantee-heading" className="relative isolate -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary text-on-primary md:rounded-t-[3.5rem]">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(var(--accent-rgb)/0.35),transparent_70%)]" />
      <Grain className="-z-10 opacity-[0.18] mix-blend-screen" />
      <span aria-hidden="true" className="absolute -bottom-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-base/15 md:h-[40rem] md:w-[40rem]" />
      <span aria-hidden="true" className="absolute -bottom-56 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full border border-base/10 md:h-[52rem] md:w-[52rem]" />
      <Container className="relative py-section lg:py-section-lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <FadeUp variant="scale">
            <Unverified note={guarantee.seal.verify} className="text-on-primary">
              <GuaranteeSeal ring={guarantee.seal.ring} center={guarantee.seal.center} unit={guarantee.seal.unit} id="guarantee" />
            </Unverified>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-8">
            <ProductPill name={guarantee.pill.name} form={guarantee.pill.form} tone="dark" />
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 id="guarantee-heading" className="mt-8 text-on-primary">
              <Unverified note={guarantee.headline.verify} className="text-ink">
                {guarantee.headline.text}
              </Unverified>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-10 w-full sm:w-auto">
            <QuizCTA location="guarantee" label={quizCta.fit} variant="inverse" className="w-full sm:w-auto" />
            <p className="mt-4 text-caption text-on-primary/75">
              {guarantee.helper.map((segment, i) => (
                <span key={typeof segment === "string" ? segment : segment.text}>
                  {i > 0 && " "}
                  {typeof segment === "string" ? segment : <Unverified note={segment.verify}>{segment.text}</Unverified>}
                </span>
              ))}
            </p>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
