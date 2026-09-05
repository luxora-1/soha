import { benefitIcons } from "@/components/landing/icons";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/** Eight tiles of what's included, each with a line icon in a tinted disc. Claims are <Unverified>. */
export function BenefitsGrid() {
  const { benefits } = landingContent;

  return (
    <SectionWrapper tone="alt" id="benefits" labelledBy="benefits-heading" padding="compact" className="lg:py-section">
      <SectionHeading id="benefits-heading" tone="surface" headline={benefits.headline} align="center" />
      <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
        {benefits.items.map((item, index) => {
          const Icon = benefitIcons[item.icon];
          return (
            <FadeUp
              key={item.label}
              as="li"
              delay={index * 0.05}
              className="group flex min-h-[10rem] flex-col items-center justify-center gap-4 rounded-tile bg-base p-5 text-center shadow-soft transition-[transform,box-shadow] duration-500 ease-out hover:shadow-lift motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-[transform,background-color] duration-500 ease-out group-hover:bg-accent/15 motion-safe:group-hover:scale-110 motion-reduce:transition-none">
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-base font-medium leading-snug text-ink">
                {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
              </p>
            </FadeUp>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
