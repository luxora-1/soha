"use client";

import { useId } from "react";
import type { CycleDays, CycleOption } from "@/config/pricing";
import { cn } from "@/lib/cn";

type CycleToggleProps = {
  options: readonly CycleOption[];
  value: CycleDays;
  onChange: (days: CycleDays) => void;
  label: string;
};

/**
 * 28 / 84-day toggle. Native radio inputs (keyboard + screen reader
 * behaviour for free) styled as a segmented pill.
 */
export function CycleToggle({ options, value, onChange, label }: CycleToggleProps) {
  const baseId = useId();
  return (
    <fieldset className="inline-block">
      <legend className="sr-only">{label}</legend>
      <div className="inline-flex rounded-full border border-ink p-1">
        {options.map((option) => {
          const checked = option.days === value;
          const id = `${baseId}-${option.days}`;
          return (
            <label
              key={option.days}
              htmlFor={id}
              className={cn(
                "relative inline-flex min-h-tap cursor-pointer select-none items-center justify-center rounded-full px-6 text-base font-medium transition-colors motion-reduce:transition-none",
                checked ? "bg-ink text-on-ink" : "text-ink hover:bg-ink/5",
              )}
            >
              <input
                id={id}
                type="radio"
                name={`${baseId}-cycle`}
                value={option.days}
                checked={checked}
                onChange={() => onChange(option.days)}
                className="peer sr-only"
              />
              <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[6px] peer-focus-visible:outline-brand absolute inset-0 rounded-full" aria-hidden="true" />
              <span className="relative">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
