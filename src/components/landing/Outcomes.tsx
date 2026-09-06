import { CountUp } from "@/components/landing/CountUp";
import { ArrowUpIcon } from "@/components/landing/icons";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
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
        headline={`${outcomes.headline.lead} ${outcomes.headline.accent}`}
        subhead={<Unverified note={outcomes.lead.verify}>{outcomes.lead.text}</Unverified>}
      />

      <ul data-reveal="" aria-label="Reported outcomes" className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-5 md:gap-4">
        {outcomes.stats.map((stat, index) => {
          const percent = Number.parseFloat(stat.value);
          const fill = Number.isFinite(percent) ? Math.min(percent, 100) / 100 : 1;
          return (
            <li
              key={stat.label}
              className={cn(
                "relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] bg-primary p-5 text-on-primary md:min-h-[15.5rem] md:p-6",
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
                  <span data-fill={fill} data-delay={200 + index * 110} className="block h-full w-full origin-left scale-x-0 rounded-full bg-accent-soft" />
                </span>
                <p className="mt-3 text-base leading-snug text-on-primary/80">{stat.label}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p data-reveal="" className="mt-10 max-w-measure font-sans text-h3 font-medium text-ink">
        <Unverified note={outcomes.reflect.verify}>{outcomes.reflect.text}</Unverified>
      </p>
      <SectionCTA location="outcomes" align="left" />

      <div className="mt-10 max-w-measure">
        <p className="text-caption text-ink-muted">
          <Unverified note={outcomes.source.verify}>{outcomes.source.text}</Unverified>
        </p>
        <p className="mt-2 text-caption text-ink-muted">{outcomes.note}</p>
      </div>
    </SectionWrapper>
  );
}
