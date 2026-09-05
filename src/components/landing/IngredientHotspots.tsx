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
 * "+" markers over the product shot, each naming an ingredient. The active
 * ingredient's description shows in a card under the image (and the marker
 * fills in). Markers are buttons, so the whole thing works by keyboard.
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
                    "inline-flex h-9 w-9 items-center justify-center rounded-full shadow-soft transition-colors motion-reduce:transition-none",
                    selected ? "bg-primary text-on-primary" : "bg-base/90 text-primary backdrop-blur-sm hover:bg-base",
                  )}
                >
                  <PlusIcon className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", selected && "rotate-45")} />
                  <span className="sr-only">{item.name}</span>
                </button>
                <span aria-hidden="true" className="hidden h-px w-8 bg-primary/50 sm:block" />
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden rounded-full px-3 py-1 text-[0.875rem] font-medium shadow-subtle sm:inline-flex",
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
          <p className="font-serif text-[1.5rem] leading-tight tracking-heading text-ink">{current.name}</p>
          <div key={current.key} className="mt-2 text-body text-ink-muted motion-safe:animate-fade-in">
            {current.content}
          </div>
        </div>
      )}
    </div>
  );
}
