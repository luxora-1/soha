import { benefitIcons } from "@/components/landing/icons";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Eight things that are included, as a plain grid of icon and label on the
 * tinted band. No boxes: the list is the information, so it needs none.
 * Claims are <Unverified>.
 */
export function BenefitsGrid() {
  const { benefits } = landingContent;

  return (
    <SectionWrapper tone="alt" id="benefits" labelledBy="benefits-heading" padding="compact" className="lg:py-section">
      <SectionHeading id="benefits-heading" tone="surface" headline={benefits.headline} />
      <ul data-reveal="" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
        {benefits.items.map((item) => {
          const Icon = benefitIcons[item.icon];
          return (
            <li key={item.label} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-base text-accent shadow-subtle">
                <Icon className="h-6 w-6" />
              </span>
              <p className="max-w-[14rem] text-base font-medium leading-snug text-ink">
                {item.verify ? <Unverified note={item.verify}>{item.label}</Unverified> : item.label}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
