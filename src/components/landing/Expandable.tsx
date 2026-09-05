"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "@/components/landing/icons";
import { cn } from "@/lib/cn";

type ExpandableProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

/** A titled card whose body expands on demand. */
export function Expandable({ title, children, className, defaultOpen = false }: ExpandableProps) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("rounded-card bg-surface", className)}>
      <h3 className="font-sans text-body font-medium leading-snug">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-body`}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-tap w-full items-start justify-between gap-4 rounded-card px-5 py-4 text-left text-ink"
        >
          <span>{title}</span>
          <PlusIcon className={cn("mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none", open && "rotate-45")} />
        </button>
      </h3>
      <div
        id={`${id}-body`}
        inert={!open}
        className={cn("grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-base text-ink-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
