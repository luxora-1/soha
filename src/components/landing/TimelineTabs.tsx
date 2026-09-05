"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/FadeUp";
import { InView } from "@/components/motion/InView";
import { cn } from "@/lib/cn";

export type TimelineTab = {
  key: string;
  /** Tab label, e.g. "Week 2". */
  label: string;
  image: ReactNode;
  content: ReactNode;
};

type TimelineTabsProps = {
  items: readonly TimelineTab[];
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
 * A rising dotted line over the photograph, one dot per week, the active
 * week's dot filled. The line draws itself and the dots pop in the first
 * time the block scrolls into view (CSS animations gated by the InView
 * wrapper's `data-inview`). Decorative.
 */
function Chart({ active, count, id }: { active: number; count: number; id: string }) {
  const maskId = `${id}-chart-mask`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-tile">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-base drop-shadow-[0_1px_2px_rgb(var(--ink-rgb)/0.45)]"
      >
        <defs>
          {/* A wide stroke along the same curve, drawn from its start, reveals the dotted line beneath it. */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <path
              d={CURVE}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset="1"
              className="motion-safe:group-data-[inview]:animate-draw motion-reduce:[stroke-dashoffset:0]"
            />
          </mask>
        </defs>
        <path
          d={CURVE}
          mask={`url(#${maskId})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="0.5 7"
        />
      </svg>
      {POINTS.slice(0, count).map(([x, y], i) => {
        const selected = i === active;
        const size = selected ? 22 : 14;
        return (
          <span
            key={i}
            style={
              {
                left: `calc(${x}% - ${size / 2}px)`,
                top: `calc(${y}% - ${size / 2}px)`,
                width: size,
                height: size,
                animationDelay: `${500 + i * 320}ms`,
              } as CSSProperties
            }
            className={cn(
              "absolute rounded-full opacity-0 shadow-soft transition-[width,height,left,top,background-color] duration-500 ease-out motion-safe:group-data-[inview]:animate-pop motion-reduce:opacity-100",
              selected ? "bg-accent ring-4 ring-[rgb(var(--bg-rgb)/0.6)]" : "bg-base",
            )}
          />
        );
      })}
    </div>
  );
}

/**
 * Week tabs along a line that fills up to the active week, with a
 * photograph and description for the selected week that cross-fade in the
 * direction of travel. Arrow keys move between weeks.
 */
export function TimelineTabs({ items, label, className }: TimelineTabsProps) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = items[active];
  const lastIndex = Math.max(items.length - 1, 1);

  const select = (next: number) => {
    setDirection(next >= active ? 1 : -1);
    setActive(next);
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12", className)}>
      <InView className="group relative lg:col-span-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current?.key}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {current?.image}
          </motion.div>
        </AnimatePresence>
        <Chart active={active} count={items.length} id={id} />
      </InView>

      <div className="lg:col-span-6">
        <div className="relative">
          <span aria-hidden="true" className="absolute left-3 top-[0.6875rem] h-px w-[75%] bg-accent-soft/70" />
          <motion.span
            aria-hidden="true"
            className="absolute left-3 top-[0.6875rem] h-px w-[75%] origin-left bg-accent"
            initial={false}
            animate={{ scaleX: active / lastIndex }}
            transition={{ type: "spring", stiffness: 160, damping: 26 }}
          />
          <div role="tablist" aria-label={label} className="relative grid grid-cols-4 gap-2">
            {items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.key}
                  id={`${id}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className="group/tab flex flex-col items-start gap-3 text-left focus-visible:outline-offset-4"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ease-out motion-reduce:transition-none",
                      selected ? "scale-100 bg-accent" : "scale-[0.6] bg-accent-soft group-hover/tab:scale-75 group-hover/tab:bg-accent/70",
                    )}
                  />
                  <span
                    className={cn(
                      "font-sans text-eyebrow uppercase tracking-eyebrow transition-colors duration-300",
                      selected ? "text-ink" : "text-ink-muted group-hover/tab:text-ink",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current?.key}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            initial={{ opacity: 0, x: 20 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 * direction }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mt-8"
          >
            {current?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
