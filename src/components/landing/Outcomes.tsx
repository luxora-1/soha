import type { CSSProperties } from "react";
import { CountUp } from "@/components/landing/CountUp";
import { ArrowUpIcon } from "@/components/landing/icons";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { InView } from "@/components/motion/InView";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/**
 * Five outcome statistics on deep tiles. Two columns on phones (the fifth
 * spans both), five across from md. Each figure counts up from zero the
 * first time it scrolls into view and a hairline under it fills to the same
 * percentage, staggered across the tiles. Every figure, the lead line, the
 * mechanism line and the source are <Unverified>.
 */
export function Outcomes() {
  const { outcomes } = landingContent;

  return (
    <SectionWrapper tone="base" id="outcomes" labelledBy="outcomes-heading">
      <SectionHeading
        id="outcomes-heading"
        label={outcomes.label}
        headline={
          <>
            {outcomes.headline.lead} <em className="italic">{outcomes.headline.accent}</em>
          </>
        }
        subhead={<Unverified note={outcomes.lead.verify}>{outcomes.lead.text}</Unverified>}
      />

      <InView as="ul" label="Reported outcomes" className="group mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-5 md:gap-4">
        {outcomes.stats.map((stat, index) => {
          const percent = Number.parseFloat(stat.value);
          const fill = Number.isFinite(percent) ? Math.min(percent, 100) / 100 : 1;
          return (
            <FadeUp
              key={stat.label}
              as="li"
              delay={index * 0.08}
              className={cn(
                "relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-tile bg-primary p-5 text-on-primary shadow-soft transition-[transform,box-shadow] duration-500 ease-out hover:shadow-lift motion-safe:hover:-translate-y-1 motion-reduce:transition-none md:min-h-[15.5rem] md:p-6",
                index === outcomes.stats.length - 1 && "col-span-2 md:col-span-1",
              )}
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_120%,rgb(var(--accent-rgb)/0.45),transparent_70%)]" />
              <p className="flex items-start gap-1 font-serif italic text-stat text-on-primary tabular-nums">
                <Unverified note={`8-week outcome: ${stat.label}`}>
                  <CountUp value={stat.value} delay={index * 0.1} />
                </Unverified>
                <ArrowUpIcon className="mt-2 h-5 w-5 text-accent-soft md:h-6 md:w-6" />
              </p>
              <div>
                <span aria-hidden="true" className="block h-1 w-full overflow-hidden rounded-full bg-base/15">
                  <span
                    className="block h-full w-full origin-left rounded-full bg-accent-soft [transform:scaleX(0)] transition-transform duration-[1600ms] ease-out motion-reduce:transition-none group-data-[inview]:[transform:scaleX(var(--fill))]"
                    style={{ "--fill": String(fill), transitionDelay: `${200 + index * 110}ms` } as CSSProperties}
                  />
                </span>
                <p className="mt-3 text-base leading-snug text-on-primary/80">{stat.label}</p>
              </div>
            </FadeUp>
          );
        })}
      </InView>

      <FadeUp as="p" className="mx-auto mt-10 max-w-measure text-center font-sans text-h3 font-medium text-ink">
        <Unverified note={outcomes.reflect.verify}>{outcomes.reflect.text}</Unverified>
      </FadeUp>
      <SectionCTA location="outcomes" />

      <div className="mx-auto mt-10 max-w-measure text-center">
        <p className="text-caption text-ink-muted">
          <Unverified note={outcomes.source.verify}>{outcomes.source.text}</Unverified>
        </p>
        <p className="mt-2 text-caption text-ink-muted">{outcomes.note}</p>
      </div>
    </SectionWrapper>
  );
}
