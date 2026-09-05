"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

type FAQAccordionProps = {
  items: readonly FaqItem[];
  /** Heading level for each question; 2 when the accordion sits directly under the page h1. */
  headingLevel?: 2 | 3;
};

/**
 * Accessible accordion (WAI-ARIA pattern): each header is a button inside a
 * heading with aria-expanded / aria-controls; each panel is a region labelled by
 * its button. Arrow keys, Home and End move between headers. Multiple panels
 * may be open. Deep links (#who-fills) open the matching item on load.
 */
export function FAQAccordion({ items, headingLevel = 2 }: FAQAccordionProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  // Open the item named in the URL hash (e.g. /faq#who-fills), on load and
  // on same-page hash navigation.
  useEffect(() => {
    const openFromHash = () => {
      const key = window.location.hash.replace(/^#/, "");
      if (!key || !items.some((item) => item.key === key)) return;
      setOpen((current) => new Set(current).add(key));
      document.getElementById(key)?.scrollIntoView({ block: "start" });
    };
    const timer = window.setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [items]);

  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
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
    <div className="divide-y divide-accent-soft border-y border-accent-soft">
      {items.map((item, index) => {
        const isOpen = open.has(item.key);
        const buttonId = `${baseId}-button-${item.key}`;
        const panelId = `${baseId}-panel-${item.key}`;
        return (
          <div key={item.key} id={item.key} className="scroll-mt-28">
            <Heading className="font-sans text-h3 font-medium">
              <button
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.key)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left font-sans text-h3 font-medium text-ink transition-colors hover:text-brand motion-reduce:transition-none"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-1 block h-6 w-6 shrink-0 text-ink-muted transition-transform duration-300 motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
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
                <div className="max-w-measure space-y-4 pb-8 text-body text-ink-muted">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
