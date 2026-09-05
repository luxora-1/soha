import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { TimelineTabs } from "@/components/landing/TimelineTabs";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** Week 2 / 4 / 6 / 8 as tabs, each with a photo and what to expect. Expectations are <Unverified>. */
export function Timeline() {
  const { timeline } = landingContent;

  return (
    <SectionWrapper tone="base" id="timeline" labelledBy="timeline-heading">
      <SectionHeading
        id="timeline-heading"
        label={timeline.label}
        headline={
          <>
            {timeline.headline.lead} <em className="italic">{timeline.headline.accent}</em>
          </>
        }
      />
      <TimelineTabs
        className="mt-10 md:mt-14"
        label={timeline.tabsLabel}
        items={timeline.steps.map((step) => ({
          key: step.key,
          label: step.short,
          image: <ImageSlot {...slot(step.slot)} sizes="(min-width: 1024px) 44vw, 100vw" className="shadow-soft" />,
          content: (
            <>
              <p className="font-serif text-[1.5rem] leading-none tracking-heading text-primary">{step.week}</p>
              <h3 className="mt-3 font-serif text-h2 text-ink">{step.title}</h3>
              <p className="mt-4 text-body-lg text-ink-muted">
                <Unverified note={`timeline: what to expect at ${step.week.toLowerCase()}`}>{step.body}</Unverified>
              </p>
              <p className="mt-4 text-body text-ink">
                <Unverified note={`timeline: ${step.stat.verify}`}>{step.stat.text}</Unverified>
              </p>
            </>
          ),
        }))}
      />
      <p className="mt-8 max-w-measure text-caption text-ink-muted">{timeline.note}</p>
      <SectionCTA location="timeline" />
    </SectionWrapper>
  );
}
