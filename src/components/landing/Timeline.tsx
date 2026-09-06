import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { TimelineStory } from "@/components/landing/TimelineStory";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Week 2 / 4 / 6 / 8: what most women notice, as a story the reader scrolls
 * through (pinned on large screens) with a photo and description per week.
 * Expectations are <Unverified>.
 */
export function Timeline() {
  const { timeline } = landingContent;

  return (
    <SectionWrapper tone="base" id="timeline" labelledBy="timeline-heading">
      <SectionHeading id="timeline-heading" label={timeline.label} headline={<>{timeline.headline.lead} <em>{timeline.headline.accent}</em></>} />
      <TimelineStory
        className="mt-10 md:mt-14"
        label={timeline.tabsLabel}
        steps={timeline.steps.map((step) => ({
          key: step.key,
          label: step.short,
          image: <ImageSlot {...slot(step.slot)} sizes="(min-width: 1024px) 44vw, 100vw" className="rounded-tile shadow-soft" />,
          content: (
            <>
              <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-primary">{step.week}</p>
              <h3 className="mt-3 text-h2 text-ink">{step.title}</h3>
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
      <SectionCTA location="timeline" align="left" />
    </SectionWrapper>
  );
}
