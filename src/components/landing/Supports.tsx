import { CheckIcon } from "@/components/landing/icons";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/** What Estrada supports, beside a lifestyle photo. Every benefit is <Unverified>. */
export function Supports() {
  const { supports, quizCta } = landingContent;

  return (
    <SectionWrapper tone="base" id="supports" labelledBy="supports-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ImageSlot {...slot(supports.slot)} sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-soft" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="supports-heading">
            {supports.headline.lead} <em className="italic">{supports.headline.accent}</em>
          </h2>
          <p className="mt-6 text-body-lg text-ink">{supports.lead}</p>
          <ul className="mt-4 space-y-3">
            {supports.items.map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-body text-ink">
                <CheckIcon className="mt-0.5 text-accent" />
                <Unverified note={`benefit: ${item.verify}`}>{item.text}</Unverified>
              </li>
            ))}
          </ul>
          <SectionCTA location="supports" label={quizCta.fit} className="items-start text-left md:mt-10" />
        </div>
      </div>
    </SectionWrapper>
  );
}
