import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper, type SectionTone } from "@/components/sections/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";

type CycleOption = { days: number; title: string; body: string };

type CycleTilesProps = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  options?: readonly CycleOption[];
  note?: string;
  tone?: SectionTone;
  id?: string;
};

/** Two cycle tiles side by side: 28 days on sand, 84 days on brand. Both link to pricing. */
export function CycleTiles({
  eyebrow = homeContent.cycles.eyebrow,
  headline = homeContent.cycles.headline,
  intro,
  options = homeContent.cycles.options,
  note,
  tone = "base",
  id = "cycles",
}: CycleTilesProps) {
  const headingId = `${id}-heading`;
  return (
    <SectionWrapper tone={tone} id={id} labelledBy={headingId} padding="compact" className="lg:py-section">
      <FadeUp className="max-w-measure">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="mt-5">
          {headline}
        </h2>
        {intro && <p className="mt-5 text-body-lg text-ink-muted">{intro}</p>}
      </FadeUp>
      <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-6 lg:gap-8">
        {options.map((option, index) => {
          const dark = index === 1;
          return (
            <FadeUp key={option.days} as="li" delay={index * 0.1}>
              <Link
                href="/pricing"
                className={cn(
                  "group relative isolate flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-tile p-4 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-base motion-reduce:transition-none md:min-h-[20rem] md:p-8 lg:min-h-[22rem] lg:p-10",
                  dark ? "bg-brand text-on-ink" : "bg-alt text-ink",
                )}
              >
                <Grain className={dark ? "opacity-[0.22] mix-blend-screen" : undefined} />
                <span
                  aria-hidden="true"
                  className="relative font-serif text-[3.5rem] leading-none tracking-heading tabular-nums md:text-[5.5rem] lg:text-[7rem]"
                >
                  {option.days}
                </span>
                <span className="relative">
                  <span className="block font-sans text-base font-medium leading-tight md:text-h3">{option.title}</span>
                  <span className={cn("mt-1.5 block text-base md:text-body", dark ? "text-on-ink/80" : "text-ink-muted")}>
                    {option.body}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-base font-medium underline underline-offset-4 opacity-90 group-hover:opacity-100 md:mt-5">
                    {homeContent.cycles.cta} <span aria-hidden="true">›</span>
                  </span>
                </span>
              </Link>
            </FadeUp>
          );
        })}
      </ul>
      {note && <p className="mt-6 text-base text-ink-muted">{note}</p>}
    </SectionWrapper>
  );
}
