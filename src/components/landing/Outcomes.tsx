import { CountUp } from "@/components/landing/CountUp";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/**
 * Five outcome statistics. Two columns on phones (the fifth spans both),
 * five across from md. Each figure counts up from zero the first time it
 * scrolls into view, staggered across the tiles. Every figure and the
 * source line are <Unverified>.
 */
export function Outcomes() {
  const { outcomes } = landingContent;

  return (
    <SectionWrapper tone="base" id="outcomes" labelledBy="outcomes-heading">
      <SectionHeading id="outcomes-heading" label={outcomes.label} headline={outcomes.headline} />

      <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-5 md:gap-4" aria-label="Reported outcomes">
        {outcomes.stats.map((stat, index) => (
          <li
            key={stat.label}
            className={cn(
              "flex flex-col justify-between gap-6 rounded-tile bg-surface p-5 md:min-h-[14rem] md:p-6",
              index === outcomes.stats.length - 1 && "col-span-2 md:col-span-1",
            )}
          >
            <p className="font-serif italic text-stat text-primary tabular-nums">
              <Unverified note={`8-week outcome: ${stat.label}`}>
                <CountUp value={stat.value} delay={index * 0.1} />
              </Unverified>
            </p>
            <p className="text-base leading-snug text-ink-muted">{stat.label}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-measure text-caption text-ink-muted">
        <Unverified note={outcomes.source.verify}>{outcomes.source.text}</Unverified>
      </p>
      <p className="mt-2 max-w-measure text-caption text-ink-muted">{outcomes.note}</p>
    </SectionWrapper>
  );
}
