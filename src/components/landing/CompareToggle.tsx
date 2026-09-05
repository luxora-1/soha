"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CompareToggleProps = {
  /** Accessible name of the control. */
  label: string;
  options: readonly [string, string];
  panels: readonly [ReactNode, ReactNode];
  className?: string;
};

/**
 * Segmented control switching between two panels (WAI-ARIA tabs). The
 * selected tab slides a filled pill behind it.
 */
export function CompareToggle({ label, options, panels, className }: CompareToggleProps) {
  const id = useId();
  const [active, setActive] = useState(0);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next = active === 0 ? 1 : 0;
      setActive(next);
      document.getElementById(`${id}-tab-${next}`)?.focus();
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label={label}
          className="relative grid w-full max-w-md grid-cols-2 rounded-full bg-surface p-1 shadow-subtle"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-base shadow-soft transition-transform duration-300 motion-reduce:transition-none",
              active === 1 && "translate-x-full",
            )}
          />
          {options.map((option, i) => (
            <button
              key={option}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative z-10 min-h-tap rounded-full px-4 text-base font-medium transition-colors motion-reduce:transition-none",
                active === i ? "text-primary" : "text-ink-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="mt-10 motion-safe:animate-fade-in md:mt-14"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
