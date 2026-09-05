import { ImageSlot } from "@/components/landing/ImageSlot";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * One card per active plus the base. A thumbnail row on phones so three
 * square images do not stack to a full screen each; full tiles from md.
 */
export function Ingredients() {
  const { ingredients } = landingContent;

  return (
    <SectionWrapper tone="alt" id="ingredients" labelledBy="ingredients-heading">
      <SectionHeading
        id="ingredients-heading"
        tone="surface"
        headline={ingredients.headline}
        subhead={<Unverified note={ingredients.subhead.verify}>{ingredients.subhead.text}</Unverified>}
      />

      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-8">
        {ingredients.cards.map((card) => (
          <li key={card.name} className="flex gap-4 rounded-tile bg-base p-4 shadow-soft md:block md:p-5">
            <div className="w-24 shrink-0 md:w-full">
              <ImageSlot {...slot(card.slot)} sizes="(min-width: 768px) 30vw, 96px" className="rounded-card" />
            </div>
            <div className="min-w-0 md:mt-6">
              <h3 className="font-serif text-[1.625rem] leading-tight tracking-heading text-ink md:text-[1.875rem]">
                {card.name}
              </h3>
              <p className="mt-2 text-body text-ink-muted md:mt-3">
                <Unverified note={`ingredient: what ${card.name.toLowerCase()} does`}>{card.body}</Unverified>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
