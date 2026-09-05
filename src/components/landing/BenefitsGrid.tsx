import { benefitIcons } from "@/components/landing/icons";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/** Eight tiles of what's included, each with a line icon. Claims are <Unverified>. */
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
              className="flex min-h-[9rem] flex-col items-center justify-center gap-3 rounded-tile bg-base p-5 text-center shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none"
            >
              <Icon className="text-accent" />
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
