import { SectionHeading } from "@/components/landing/SectionHeading";
import { Unverified } from "@/components/landing/Unverified";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { landingContent } from "@/content/landing";

/**
 * Estrada versus other delivery methods. An ARIA grid so the layout can
 * reflow: on phones each criterion sits above its two cells; from md the
 * criterion is a third column. Every comparative cell is <Unverified>.
 *
 * CLAIM_PENDING_LEGAL_REVIEW: clinical comparisons beyond convenience.
 */
export function ComparisonTable() {
  const { comparison } = landingContent;

  return (
    <SectionWrapper tone="base" id="comparison" labelledBy="comparison-heading">
      <SectionHeading
        id="comparison-heading"
        headline={comparison.headline}
        subhead={<Unverified note={comparison.subhead.verify}>{comparison.subhead.text}</Unverified>}
      />

      <div
        role="table"
        aria-labelledby="comparison-heading"
        className="mt-10 overflow-hidden rounded-tile bg-surface p-2 shadow-soft md:mt-14 md:p-3"
      >
        <div role="rowgroup">
          <div
            role="row"
            className="grid grid-cols-2 gap-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-3"
          >
            <div role="columnheader" className="hidden px-4 py-3 text-base text-ink-muted md:block md:px-5 md:py-4">
              {comparison.columns.criterion}
            </div>
            <div role="columnheader" className="rounded-card bg-base px-4 py-3 text-base font-medium text-primary md:px-5 md:py-4">
              {comparison.columns.estrada}
            </div>
            <div role="columnheader" className="px-4 py-3 text-base font-medium text-ink md:px-5 md:py-4">
              {comparison.columns.other}
            </div>
          </div>
        </div>

        <div role="rowgroup" className="mt-2 flex flex-col gap-2 md:mt-3 md:gap-3">
          {comparison.rows.map((row) => (
            <div
              key={row.label}
              role="row"
              className="grid grid-cols-2 gap-2 md:grid-cols-[minmax(10rem,1fr)_2fr_2fr] md:gap-3"
            >
              <div
                role="rowheader"
                className="col-span-2 px-4 pt-3 text-base font-medium text-ink md:col-span-1 md:px-5 md:py-4"
              >
                {row.label}
              </div>
              <div role="cell" className="rounded-card bg-base px-4 py-4 text-base text-ink md:px-5">
                <Unverified note={`comparison — ${row.label} (Estrada)`}>{row.estrada}</Unverified>
              </div>
              <div role="cell" className="px-4 py-4 text-base text-ink-muted md:px-5">
                <Unverified note={`comparison — ${row.label} (other methods)`}>{row.other}</Unverified>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-measure text-caption text-ink-muted">{comparison.footnote}</p>
    </SectionWrapper>
  );
}
