import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * The patchwork of separate prescriptions versus one cream: two columns,
 * an image in each. The Estrada card is the page's one dark panel above the
 * fold of the closing section.
 */
export function Problem() {
  const { problem } = landingContent;

  return (
    <SectionWrapper tone="alt" id="problem" labelledBy="problem-heading">
      <SectionHeading
        id="problem-heading"
        tone="surface"
        align="center"
        headline={problem.headline}
        subhead={
          <span className="font-serif text-[1.375rem] italic leading-snug tracking-heading text-primary md:text-[1.5rem]">
            {problem.subhead.lead} <em>{problem.subhead.accent}</em>
          </span>
        }
      />

      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
        <article className="rounded-tile bg-base p-4 shadow-soft md:p-6">
          <ImageSlot {...slot(problem.patchwork.slot)} sizes="(min-width: 768px) 45vw, 100vw" className="rounded-card" />
          <h3 className="mt-6 text-ink">{problem.patchwork.title}</h3>
          <p className="mt-3 text-body text-ink-muted">{problem.patchwork.body}</p>
        </article>

        <article className="rounded-tile bg-primary p-4 text-on-primary shadow-soft md:p-6">
          <ImageSlot {...slot(problem.single.slot)} sizes="(min-width: 768px) 45vw, 100vw" className="rounded-card" />
          <h3 className="mt-6 text-on-primary">{problem.single.title}</h3>
          <p className="mt-3 text-body text-on-primary/80">
            <Unverified note={problem.single.claim.verify}>{problem.single.claim.text}</Unverified> {problem.single.body}
          </p>
        </article>
      </div>
    </SectionWrapper>
  );
}
