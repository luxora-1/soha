import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Week 2 / 4 / 6 / 8. A vertical rail with dots on phones, a horizontal
 * rail from md. What to expect at each point is <Unverified>.
 */
export function Timeline() {
  const { timeline } = landingContent;

  return (
    <SectionWrapper tone="base" id="timeline" labelledBy="timeline-heading">
      <SectionHeading id="timeline-heading" label={timeline.label} headline={timeline.headline} />

      <ol className="relative mt-10 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
        {/* The rail: vertical beside the dots on phones, horizontal through them from md. */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-accent-soft md:bottom-auto md:left-0 md:right-0 md:top-[0.6875rem] md:h-px md:w-auto"
        />
        {timeline.steps.map((step) => (
          <li key={step.week} className="relative pl-10 md:pl-0 md:pt-10">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0.5 h-6 w-6 rounded-full bg-accent md:top-0"
            />
            <p className="font-serif text-[1.5rem] leading-none tracking-heading text-primary">{step.week}</p>
            <h3 className="mt-3 text-ink">{step.title}</h3>
            <p className="mt-2 text-body text-ink-muted">
              <Unverified note={`timeline: what to expect at ${step.week.toLowerCase()}`}>{step.body}</Unverified>
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-10 max-w-measure text-caption text-ink-muted">{timeline.note}</p>
    </SectionWrapper>
  );
}
