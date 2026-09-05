"use client";

import { useSyncExternalStore } from "react";
import {
  defaultPalette,
  isPaletteId,
  paletteOrder,
  palettes,
  type PaletteId,
} from "@/config/design-tokens";
import { cn } from "@/lib/cn";

/** URL parameter the switcher reads on load and writes on change. */
const PARAM = "palette";

/* The <html data-palette> attribute is the single source of truth. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
  return () => observer.disconnect();
}

function readPalette(): PaletteId {
  const current = document.documentElement.getAttribute("data-palette");
  return isPaletteId(current) ? current : defaultPalette;
}

function applyPalette(id: PaletteId) {
  document.documentElement.setAttribute("data-palette", id);
  const url = new URL(window.location.href);
  url.searchParams.set(PARAM, id);
  window.history.replaceState(window.history.state, "", url);
}

/**
 * Floating palette switcher — DEVELOPMENT ONLY (rendered by DevTools, which
 * returns null in production). Cycles the five palettes by setting
 * `data-palette` on <html> and mirrors the choice into `?palette=` so a
 * screenshot's URL says which scheme it shows. Fixed to the bottom-right
 * corner; affects no page layout.
 */
export function PaletteSwitcher() {
  const active = useSyncExternalStore(subscribe, readPalette, () => defaultPalette);
  const palette = palettes[active];

  const step = (delta: number) => {
    const index = paletteOrder.indexOf(active);
    applyPalette(paletteOrder[(index + delta + paletteOrder.length) % paletteOrder.length]);
  };

  return (
    <div
      role="group"
      aria-label="Palette switcher (development only)"
      className="fixed bottom-4 right-4 z-[90] flex items-center gap-1 rounded-full bg-ink p-1.5 font-sans text-[0.8125rem] text-on-ink shadow-lift"
    >
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous palette"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-base/15 focus-visible:outline-base"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className="flex items-center gap-2 px-1">
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary font-serif text-base uppercase text-on-primary"
        >
          {palette.id}
        </span>
        <span className="hidden min-w-[7.5rem] whitespace-nowrap font-medium sm:inline">
          <span className="sr-only">Palette {palette.id.toUpperCase()}: </span>
          {palette.name}
        </span>
      </div>

      <ol className="flex items-center gap-1 px-1" aria-label="Palettes">
        {paletteOrder.map((id) => {
          const selected = id === active;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => applyPalette(id)}
                aria-pressed={selected}
                aria-label={`${id.toUpperCase()} — ${palettes[id].name}`}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full uppercase focus-visible:outline-base",
                  selected ? "bg-base text-ink" : "text-on-ink/70 hover:bg-base/15 hover:text-on-ink",
                )}
              >
                {id}
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next palette"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-base/15 focus-visible:outline-base"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
