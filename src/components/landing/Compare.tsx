import { CompareToggle } from "@/components/landing/CompareToggle";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { IngredientHotspots } from "@/components/landing/IngredientHotspots";
import { SectionCTA } from "@/components/landing/SectionCTA";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { slot } from "@/config/landing-images";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/cn";

/**
 * Estrada versus the other methods. A segmented control switches between
 * the product shot with ingredient hotspots plus three ingredient tiles (the
 * macro textures with the name and a line over a deep gradient), and the
 * delivery-method comparison table, whose Estrada column is one deep band.
 * Every clinical statement is <Unverified>.
 *
 * CLAIM_PENDING_LEGAL_REVIEW: clinical comparisons beyond convenience.
 */
export function Compare() {
  const { compare } = landingContent;

  const estradaPanel = (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
      <IngredientHotspots
        className="lg:col-span-5"
        label={compare.hotspots.label}
        image={<ImageSlot {...slot(compare.hotspots.slot)} sizes="(min-width: 1024px) 40vw, 100vw" className="rounded-tile" />}
        items={compare.hotspots.items.map((item) => ({
          key: item.key,
          name: item.name,
          x: item.x,
          y: item.y,
          content: <Unverified note={item.body.verify}>{item.body.text}</Unverified>,
        }))}
      />
      <div className="lg:col-span-7">
        <p className="max-w-measure text-body-lg text-ink-muted">
          <Unverified note={compare.ingredients.subhead.verify}>{compare.ingredients.subhead.text}</Unverified>
        </p>
        <ul data-reveal="" className="mt-6 grid gap-4 sm:grid-cols-3">
          {compare.ingredients.cards.map((card) => (
            <li key={card.name} className="relative isolate overflow-hidden rounded-card bg-panel text-on-panel">
              <div className="relative aspect-[4/3] sm:aspect-[3/4]">
                <ImageSlot {...slot(card.slot)} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 100vw" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(var(--panel-rgb)/0.92)_0%,rgb(var(--panel-rgb)/0.55)_45%,rgb(var(--panel-rgb)/0)_75%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-on-panel">{card.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-on-panel/85">
                    <Unverified note={`ingredient: what ${card.name.toLowerCase()} does`} className="text-panel">
                      {card.body}
                    </Unverified>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const { table } = compare;
  const last = table.rows.length - 1;
  const otherPanel = (
    <div>
      <div className="max-w-measure">
        <h3 className="text-h2 text-ink">{table.headline}</h3>
        <p className="mt-4 text-body-lg text-ink-muted">
          <Unverified note={table.subhead.verify}>{table.subhead.text}</Unverified>
        </p>
      </div>
      <div data-reveal="" role="table" aria-label={table.headline} className="mt-10 overflow-hidden rounded-tile bg-base p-2 md:p-3">
        <div role="rowgroup">
          <div role="row" className="grid grid-cols-2 gap-x-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-x-3">
            <div role="columnheader" className="hidden px-4 py-3 text-base text-ink-muted md:block md:px-5 md:py-4">
              {table.columns.criterion}
            </div>
            <div role="columnheader" className="rounded-t-card bg-panel px-4 pb-3 pt-4 text-base font-medium text-on-panel md:px-5 md:pt-5">
              {table.columns.estrada}
            </div>
            <div role="columnheader" className="px-4 pb-3 pt-4 text-base font-medium text-ink md:px-5 md:pt-5">
              {table.columns.other}
            </div>
          </div>
        </div>
        <div role="rowgroup" className="flex flex-col">
          {table.rows.map((row, index) => (
            <div key={row.label} role="row" className="grid grid-cols-2 gap-x-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-x-3">
              <div role="rowheader" className="col-span-2 px-4 pt-4 text-base font-medium text-ink md:col-span-1 md:border-t md:border-accent-soft/40 md:px-5 md:py-4">
                {row.label}
              </div>
              <div
                role="cell"
                className={cn(
                  "relative bg-panel px-4 py-4 text-base text-on-panel before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-base/15 md:px-5 md:before:inset-x-5",
                  index === last && "rounded-b-card pb-5",
                )}
              >
                <Unverified note={`comparison — ${row.label} (Estrada)`} className="text-ink">
                  {row.estrada}
                </Unverified>
              </div>
              <div role="cell" className={cn("border-t border-accent-soft/40 px-4 py-4 text-base text-ink-muted md:px-5", index === last && "pb-5")}>
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
      <SectionHeading id="compare-heading" tone="surface" headline={compare.headline} />
      <CompareToggle
        className="mt-10 md:mt-12"
        label={compare.toggle.label}
        options={[compare.toggle.estrada, compare.toggle.other]}
        panels={[estradaPanel, otherPanel]}
      />
      <div data-reveal="" className="mt-14 max-w-measure md:mt-20">
        <h3 className="text-h2 text-ink">{compare.works.headline}</h3>
        <p className="mt-4 text-body-lg text-ink-muted">
          <Unverified note={compare.works.body.verify}>{compare.works.body.text}</Unverified>
        </p>
      </div>
      <SectionCTA location="compare" align="left" />
    </SectionWrapper>
  );
}
