"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "@/components/landing/icons";
import { cn } from "@/lib/cn";

export type Hotspot = {
  key: string;
  name: string;
  /** Position on the image, in percent. */
  x: number;
  y: number;
  content: ReactNode;
};

type IngredientHotspotsProps = {
  /** The product shot, server-rendered. */
  image: ReactNode;
  items: readonly Hotspot[];
  label: string;
  className?: string;
};

/**
 * "+" markers over the product shot, each naming an ingredient along a
 * dashed leader line. A slow ring pulses from the unselected markers to
 * invite a tap; the active ingredient's description shows in a card under
 * the image (and its marker fills in). Markers are buttons, so the whole
 * thing works by keyboard.
 */
export function IngredientHotspots({ image, items, label, className }: IngredientHotspotsProps) {
  const id = useId();
  const [active, setActive] = useState(items[0]?.key ?? "");
  const current = items.find((item) => item.key === active) ?? items[0];

  return (
    <div className={className}>
      <div className="relative">
        {image}
        <ul aria-label={label} className="absolute inset-0">
          {items.map((item) => {
            const selected = item.key === active;
            const leftSide = item.x > 50;
            return (
              <li
                key={item.key}
                className={cn("absolute flex items-center gap-2", leftSide ? "flex-row-reverse" : "flex-row")}
                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: leftSide ? "translate(-100%, -50%)" : "translate(0, -50%)" }}
              >
                <button
                  type="button"
                  onClick={() => setActive(item.key)}
                  aria-pressed={selected}
                  aria-controls={`${id}-detail`}
                  className={cn(
                    "relative isolate inline-flex h-10 w-10 items-center justify-center rounded-full shadow-soft transition-[background-color,transform] duration-300 ease-out motion-safe:hover:scale-105 motion-reduce:transition-none",
                    selected ? "bg-primary text-on-primary" : "bg-base/90 text-primary backdrop-blur-sm hover:bg-base",
                    !selected &&
                      "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-base/70 after:content-[''] motion-safe:after:animate-pulse-ring",
                  )}
                >
                  <PlusIcon className={cn("h-4 w-4 transition-transform duration-300 motion-reduce:transition-none", selected && "rotate-45")} />
                  <span className="sr-only">{item.name}</span>
                </button>
                <span aria-hidden="true" className="hidden w-8 border-t border-dashed border-primary/60 sm:block" />
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden rounded-full px-3 py-1.5 text-[0.875rem] font-medium shadow-subtle transition-colors duration-300 sm:inline-flex",
                    selected ? "bg-primary text-on-primary" : "bg-base/90 text-ink backdrop-blur-sm",
                  )}
                >
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {current && (
        <div
          id={`${id}-detail`}
          role="region"
          aria-live="polite"
          aria-label={current.name}
          className="mt-4 rounded-card bg-base p-5 shadow-soft"
        >
          <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{current.name}</p>
          <div key={current.key} className="mt-2 text-body text-ink-muted motion-safe:animate-fade-in">
            {current.content}
          </div>
        </div>
      )}
    </div>
  );
}
