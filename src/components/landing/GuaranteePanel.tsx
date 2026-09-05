import { ProductPill } from "@/components/landing/ProductPill";
import { QuizCTA } from "@/components/landing/QuizCTA";
import { Unverified } from "@/components/landing/Unverified";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/content/landing";

/** Dark full-width guarantee panel with the quiz button. Terms are <Unverified>. */
export function GuaranteePanel() {
  const { guarantee, quizCta } = landingContent;

  return (
    <section aria-labelledby="guarantee-heading" className="relative isolate -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary text-on-primary md:rounded-t-[3.5rem]">
      <span aria-hidden="true" className="absolute -bottom-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-base/15 md:h-[40rem] md:w-[40rem]" />
      <span aria-hidden="true" className="absolute -bottom-56 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full border border-base/10 md:h-[52rem] md:w-[52rem]" />
      <Container className="relative py-section lg:py-section-lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <ProductPill name={guarantee.pill.name} form={guarantee.pill.form} tone="dark" />
          <h2 id="guarantee-heading" className="mt-8 text-on-primary">
            <Unverified note={guarantee.headline.verify}>{guarantee.headline.text}</Unverified>
          </h2>
          <QuizCTA location="guarantee" label={quizCta.fit} variant="inverse" className="mt-10 w-full sm:w-auto" />
          <p className="mt-4 text-caption text-on-primary/75">
            {guarantee.helper.map((segment, i) => (
              <span key={typeof segment === "string" ? segment : segment.text}>
                {i > 0 && " "}
                {typeof segment === "string" ? segment : <Unverified note={segment.verify}>{segment.text}</Unverified>}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
