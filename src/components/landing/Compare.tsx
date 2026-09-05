import { CompareToggle } from "@/components/landing/CompareToggle";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { IngredientHotspots } from "@/components/landing/IngredientHotspots";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";

/**
 * Estrada versus the other methods. A segmented control switches between
 * the product shot with ingredient hotspots (plus the three ingredient
 * cards) and the delivery-method comparison table. Every clinical statement
 * is <Unverified>.
 *
 * CLAIM_PENDING_LEGAL_REVIEW: clinical comparisons beyond convenience.
 */
export function Compare() {
  const { compare } = landingContent;

  const estradaPanel = (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
      <IngredientHotspots
        className="lg:col-span-6"
        label={compare.hotspots.label}
        image={<ImageSlot {...slot(compare.hotspots.slot)} sizes="(min-width: 1024px) 44vw, 100vw" className="shadow-soft" />}
        items={compare.hotspots.items.map((item) => ({
          key: item.key,
          name: item.name,
          x: item.x,
          y: item.y,
          content: <Unverified note={item.body.verify}>{item.body.text}</Unverified>,
        }))}
      />
      <div className="lg:col-span-6">
        <p className="text-body-lg text-ink-muted">
          <Unverified note={compare.ingredients.subhead.verify}>{compare.ingredients.subhead.text}</Unverified>
        </p>
        <ul className="mt-6 flex flex-col gap-4">
          {compare.ingredients.cards.map((card) => (
            <li key={card.name} className="flex gap-4 rounded-tile bg-base p-4 shadow-soft">
              <div className="w-20 shrink-0 md:w-24">
                <ImageSlot {...slot(card.slot)} sizes="96px" compact className="rounded-card" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-[1.5rem] leading-tight tracking-heading text-ink">{card.name}</h3>
                <p className="mt-1.5 text-base text-ink-muted">
                  <Unverified note={`ingredient: what ${card.name.toLowerCase()} does`}>{card.body}</Unverified>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const { table } = compare;
  const otherPanel = (
    <div>
      <div className="mx-auto max-w-measure text-center">
        <h3 className="font-serif text-h2 text-ink">{table.headline}</h3>
        <p className="mt-4 text-body-lg text-ink-muted">
          <Unverified note={table.subhead.verify}>{table.subhead.text}</Unverified>
        </p>
      </div>
      <div role="table" aria-label={table.headline} className="mt-10 overflow-hidden rounded-tile bg-base p-2 shadow-soft md:p-3">
        <div role="rowgroup">
          <div role="row" className="grid grid-cols-2 gap-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-3">
            <div role="columnheader" className="hidden px-4 py-3 text-base text-ink-muted md:block md:px-5 md:py-4">
              {table.columns.criterion}
            </div>
            <div role="columnheader" className="rounded-card bg-primary px-4 py-3 text-base font-medium text-on-primary md:px-5 md:py-4">
              {table.columns.estrada}
            </div>
            <div role="columnheader" className="px-4 py-3 text-base font-medium text-ink md:px-5 md:py-4">
              {table.columns.other}
            </div>
          </div>
        </div>
        <div role="rowgroup" className="mt-2 flex flex-col gap-2 md:mt-3 md:gap-3">
          {table.rows.map((row) => (
            <div key={row.label} role="row" className="grid grid-cols-2 gap-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-3">
              <div role="rowheader" className="col-span-2 px-4 pt-3 text-base font-medium text-ink md:col-span-1 md:px-5 md:py-4">
                {row.label}
              </div>
              <div role="cell" className="rounded-card bg-primary/[0.07] px-4 py-4 text-base text-ink md:px-5">
                <Unverified note={`comparison — ${row.label} (Estrada)`}>{row.estrada}</Unverified>
              </div>
              <div role="cell" className="px-4 py-4 text-base text-ink-muted md:px-5">
                <Unverified note={`comparison — ${row.label} (other methods)`}>{row.other}</Unverified>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 max-w-measure text-caption text-ink-muted">{table.footnote}</p>
    </div>
  );

  return (
    <SectionWrapper tone="alt" id="compare" labelledBy="compare-heading">
      <SectionHeading id="compare-heading" tone="surface" headline={compare.headline} align="center" />
      <CompareToggle
        className="mt-10 md:mt-12"
        label={compare.toggle.label}
        options={[compare.toggle.estrada, compare.toggle.other]}
        panels={[estradaPanel, otherPanel]}
      />
      <div className="mx-auto mt-14 max-w-measure text-center md:mt-20">
        <h3 className="font-serif text-h2 text-ink">{compare.works.headline}</h3>
        <p className="mt-4 text-body-lg text-ink-muted">
          <Unverified note={compare.works.body.verify}>{compare.works.body.text}</Unverified>
        </p>
      </div>
      <SectionCTA location="compare" />
    </SectionWrapper>
  );
}
