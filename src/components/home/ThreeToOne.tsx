import { Grain } from "@/components/ui/Grain";
import { homeContent } from "@/content/home";

/**
 * "Three into one" visual: three outlined labels resolving into a single
 * filled one. Purely a convenience illustration of the brief's copy —
 * it makes no claim about efficacy.
 */
export function ThreeToOne() {
  const { threeToOne } = homeContent;

  return (
    <figure className="relative isolate overflow-hidden rounded-tile bg-accent-soft p-8 md:p-10 lg:p-12">
      <Grain />
      <div className="relative flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-8">
        <ul className="flex flex-1 flex-col gap-3" aria-label="Separate prescriptions">
          {threeToOne.before.map((item) => (
            <li
              key={item}
              className="flex min-h-[3.25rem] items-center justify-between rounded-full border border-ink/20 bg-base/60 px-5 text-base text-ink"
            >
              {item}
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink/30" />
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="flex items-center justify-center text-ink-muted">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-90 md:rotate-0">
            <path d="M6 20h26M22 10l10 10-10 10" />
          </svg>
        </span>
        <div className="flex flex-1 items-center">
          <div className="flex min-h-[3.25rem] w-full items-center justify-between rounded-full bg-ink px-5 text-base font-medium text-on-ink">
            {threeToOne.after}
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-base" />
          </div>
        </div>
      </div>
      <figcaption className="relative mt-6 text-base text-ink-muted">{threeToOne.caption}</figcaption>
    </figure>
  );
}
