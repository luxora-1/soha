import { ImageSlot } from "@/components/landing/ImageSlot";
import { ProductPill } from "@/components/landing/ProductPill";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Grain } from "@/components/ui/Grain";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * The patchwork of separate prescriptions versus one cream. The usual way is
 * a light card with the still life; the Estrada way is a deep card with the
 * dispenser alone, the statement, and three short lines in italic serif.
 */
export function Problem() {
  const { problem } = landingContent;

  return (
    <SectionWrapper tone="base" id="problem" labelledBy="problem-heading">
      <SectionHeading
        id="problem-heading"
        headline={problem.headline}
        subhead={
          <span className="font-serif text-[1.375rem] italic leading-snug tracking-heading text-primary md:text-[1.5rem]">
            {problem.subhead.lead} {problem.subhead.accent}
          </span>
        }
      />

      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
        <article data-reveal="" className="flex flex-col rounded-[2rem] bg-surface p-4 text-center md:p-6">
          <ImageSlot {...slot(problem.patchwork.slot)} sizes="(min-width: 768px) 45vw, 100vw" className="rounded-card" />
          <h3 className="mt-6 text-ink">{problem.patchwork.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-body text-ink-muted">{problem.patchwork.body}</p>
        </article>

        <article data-reveal="" className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-ink p-4 text-center text-on-ink md:p-6">
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-glow" />
          <Grain className="-z-10 opacity-[0.22] mix-blend-screen" />
          <ImageSlot {...slot(problem.single.slot)} sizes="(min-width: 768px) 45vw, 100vw" className="rounded-card" />
          <h3 className="mt-6 text-on-ink">{problem.single.title}</h3>
          <p className="mx-auto mt-3 max-w-md font-serif text-[1.375rem] leading-snug tracking-heading text-on-ink md:text-[1.5rem]">
            <Unverified note={problem.single.claim.verify} className="text-ink">
              {problem.single.claim.text}
            </Unverified>
          </p>
          <div className="mt-6 flex justify-center">
            <ProductPill name={landingContent.product.name} form={landingContent.product.form} tone="dark" />
          </div>
          <ul className="mt-5 grid grid-cols-3 gap-2 font-serif text-[1.125rem] italic leading-snug tracking-heading text-accent-soft md:text-[1.25rem]">
            {problem.single.trio.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      </div>
    </SectionWrapper>
  );
}
