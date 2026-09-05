"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
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

/**
 * Week tabs along a line, the active week's dot enlarged, with an image and
 * description for the selected week. Arrow keys move between weeks.
 */
export function TimelineTabs({ items, label, className }: TimelineTabsProps) {
  const id = useId();
  const [active, setActive] = useState(0);
  const current = items[active];

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12", className)}>
      <div className="lg:col-span-6" key={current?.key}>
        <div className="motion-safe:animate-fade-in">{current?.image}</div>
      </div>

      <div className="lg:col-span-6">
        <div className="relative">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[0.6875rem] h-px bg-accent-soft" />
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
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className="group flex flex-col items-start gap-3 text-left focus-visible:outline-offset-4"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 motion-reduce:transition-none",
                      selected ? "scale-100 bg-accent" : "scale-75 bg-accent-soft group-hover:bg-accent/70",
                    )}
                  />
                  <span
                    className={cn(
                      "font-sans text-eyebrow uppercase tracking-eyebrow",
                      selected ? "text-ink" : "text-ink-muted group-hover:text-ink",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          key={current?.key}
          className="mt-8 motion-safe:animate-fade-in"
        >
          {current?.content}
        </div>
      </div>
    </div>
  );
}
