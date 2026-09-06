import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TimelineStep = {
  key: string;
  /** Tab label, e.g. "Week 2". */
  label: string;
  image: ReactNode;
  content: ReactNode;
};

type TimelineStoryProps = {
  steps: readonly TimelineStep[];
  label: string;
  className?: string;
};

/** Where each week's dot sits over the photograph, in percent. The curve rises left to right. */
const POINTS: ReadonlyArray<readonly [number, number]> = [
  [14, 78],
  [40, 62],
  [66, 44],
  [90, 24],
];
const CURVE = "M14 78 C 24 78, 32 66, 40 62 S 56 48, 66 44 S 80 30, 90 24";

/**
 * The eight-week story. Server-rendered with every week present: the four
 * photographs stacked in one frame, the four descriptions stacked beside the
 * week rail, and a dotted curve over the photograph with a dot per week.
 *
 * The motion script (lib/motion/orchestrate.ts, `data-timeline`) does the
 * rest. On large screens with motion allowed it pins this block and scrubs
 * through the weeks as the reader scrolls, the curve drawing itself and the
 * rail filling; clicking a week scrolls to it. Elsewhere the weeks are plain
 * tabs with a cross-fade, and without motion they switch instantly.
 */
export function TimelineStory({ steps, label, className }: TimelineStoryProps) {
  const id = "timeline";
  const maskId = `${id}-mask`;

  return (
    <div data-timeline="" className={className}>
      <div data-timeline-pin="" className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="relative lg:col-span-6">
          <div className="grid">
            {steps.map((step, i) => (
              <div key={step.key} data-timeline-image="" data-active={i === 0 ? "true" : "false"} className="col-start-1 row-start-1">
                {step.image}
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-base drop-shadow-[0_1px_2px_rgb(var(--ink-rgb)/0.45)]">
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                  <path data-timeline-path="" d={CURVE} fill="none" stroke="white" strokeWidth={8} strokeLinecap="round" />
                </mask>
              </defs>
              <path d={CURVE} mask={`url(#${maskId})`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" strokeDasharray="0.5 7" />
            </svg>
            {POINTS.slice(0, steps.length).map(([x, y], i) => (
              <span
                key={i}
                data-timeline-dot=""
                data-active={i === 0 ? "true" : "false"}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base shadow-soft transition-[background-color,box-shadow,transform] duration-500 ease-out data-[active=true]:scale-125 data-[active=true]:bg-accent data-[active=true]:shadow-[0_0_0_4px_rgb(var(--bg-rgb)/0.6)] motion-reduce:transition-none"
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <span aria-hidden="true" className="absolute left-3 top-[0.6875rem] h-px w-[75%] bg-accent-soft/70" />
            <span aria-hidden="true" data-timeline-rail="" className="absolute left-3 top-[0.6875rem] h-px w-[75%] origin-left scale-x-0 bg-accent" />
            <div role="tablist" aria-label={label} className="relative grid grid-cols-4 gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.key}
                  id={`${id}-tab-${i}`}
                  role="tab"
                  type="button"
                  data-timeline-tab=""
                  data-active={i === 0 ? "true" : "false"}
                  aria-selected={i === 0}
                  aria-controls={`${id}-panel-${i}`}
                  tabIndex={i === 0 ? 0 : -1}
                  className="group/tab flex flex-col items-start gap-3 text-left focus-visible:outline-offset-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft transition-[transform,background-color] duration-300 ease-out scale-[0.6] group-hover/tab:scale-75 group-hover/tab:bg-accent/70 group-data-[active=true]/tab:scale-100 group-data-[active=true]/tab:bg-accent motion-reduce:transition-none"
                  />
                  <span className="text-base text-ink-muted transition-colors duration-300 group-hover/tab:text-ink group-data-[active=true]/tab:font-medium group-data-[active=true]/tab:text-ink">
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid">
            {steps.map((step, i) => (
              <div
                key={step.key}
                id={`${id}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${i}`}
                data-timeline-panel=""
                data-active={i === 0 ? "true" : "false"}
                aria-hidden={i !== 0}
                inert={i !== 0}
                className={cn("col-start-1 row-start-1")}
              >
                {step.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
