"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  /** Stable key, also used in element ids. */
  key: string;
  heading: ReactNode;
  body: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  /** Heading level for each item; 3 when the accordion sits under a section h2. */
  headingLevel?: 2 | 3;
  /** Which ground the accordion sits on; card items take the other tone. */
  tone?: "base" | "surface";
  /**
   * `cards`: each item is its own soft card. `rows`: plain rows separated by
   * a soft hairline, the quieter form the reference pages use for the
   * hero's short answers and the FAQ.
   */
  variant?: "cards" | "rows";
  defaultOpen?: readonly string[];
  /** Accessible name for the list. */
  label?: string;
};

/**
 * Accessible accordion (WAI-ARIA pattern) for content authored as React
 * nodes, so server-rendered pieces such as <Unverified> can live inside the
 * panels. Each header is a button inside a heading with aria-expanded /
 * aria-controls; each panel is a region labelled by its button. Arrow keys,
 * Home and End move between headers. Multiple panels may be open. Panels
 * animate open with a grid-rows transition and are inert while closed; the
 * plus turns into a minus.
 */
export function Accordion({
  items,
  headingLevel = 3,
  tone = "base",
  variant = "cards",
  defaultOpen = [],
  label,
}: AccordionProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const rows = variant === "rows";

  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = items.length - 1;
    let target: number | null = null;
    if (event.key === "ArrowDown") target = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") target = index === 0 ? last : index - 1;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = last;
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <ul className={cn("flex flex-col", rows ? "divide-y divide-accent-soft/50" : "gap-3")} aria-label={label}>
      {items.map((item, index) => {
        const isOpen = open.has(item.key);
        const buttonId = `${baseId}-${item.key}-button`;
        const panelId = `${baseId}-${item.key}-panel`;
        return (
          <li
            key={item.key}
            className={cn(
              !rows && "rounded-card transition-shadow duration-300",
              !rows && (tone === "base" ? "bg-surface" : "bg-base shadow-soft hover:shadow-lift"),
            )}
          >
            <Heading className={cn("font-sans font-medium leading-snug", rows ? "text-[1.0625rem] md:text-[1.125rem]" : "text-body")}>
              <button
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.key)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "group flex min-h-tap w-full items-center justify-between gap-4 text-left text-ink",
                  rows ? "py-5 md:py-6" : "rounded-card px-5 py-4 md:px-6 md:py-5",
                )}
              >
                <span className="transition-colors duration-300 group-hover:text-primary">{item.heading}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "bg-primary text-on-primary" : "bg-ink/[0.06] text-ink group-hover:bg-accent-soft/50",
                  )}
                >
                  <span className="absolute left-1/2 top-1/2 block h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 block h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none",
                      isOpen && "rotate-90 scale-y-0",
                    )}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className={cn("text-body text-ink-muted", rows ? "pb-6 pr-12" : "px-5 pb-5 md:px-6 md:pb-6")}>{item.body}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
