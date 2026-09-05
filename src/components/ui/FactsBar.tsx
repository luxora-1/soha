import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type FactsBarProps = {
  items: readonly string[];
  /** Accessible name for the region. */
  label: string;
  /**
   * Phone layout: `two-up` = two stacked lines of two (trust bar);
   * `stack` = one item per line until `sm`, then three across.
   * From `md` up both become a single dotted row.
   */
  variant?: "two-up" | "stack";
};

const grids = {
  "two-up": "grid-cols-1 min-[375px]:grid-cols-2",
  stack: "grid-cols-1 sm:grid-cols-3",
} as const;

/**
 * A single row of short facts with dot separators on wider screens and a
 * clean stacked grid (no dots) on phones. Separators are CSS-only so screen
 * readers hear a plain list.
 */
export function FactsBar({ items, label, variant = "two-up" }: FactsBarProps) {
  return (
    <section aria-label={label} className="border-y border-accent-soft bg-alt">
      <Container className="py-5 md:py-6">
        <ul
          className={cn(
            "grid gap-x-4 gap-y-3 text-center text-base text-ink-muted md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-3",
            grids[variant],
          )}
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-x-3 before:hidden before:text-ink-muted before:content-['·'] before:[font-size:1.5em] before:leading-none md:before:inline md:first:before:hidden"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
