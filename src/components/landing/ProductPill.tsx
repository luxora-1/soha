import { cn } from "@/lib/cn";

type ProductPillProps = { name: string; form: string; tone?: "light" | "dark"; className?: string };

/** "Estrada · Combination cream" as a filled name pill and a tinted form chip. */
export function ProductPill({ name, form, tone = "light", className }: ProductPillProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex min-h-[2.25rem] items-center rounded-full px-4 font-serif text-[1.25rem] leading-none tracking-heading",
          dark ? "bg-base text-ink" : "bg-primary text-on-primary",
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          "inline-flex min-h-[2.25rem] items-center rounded-full px-3 text-[0.875rem] font-medium leading-none",
          dark ? "bg-base/15 text-on-primary" : "bg-primary/10 text-primary",
        )}
      >
        {form}
      </span>
    </span>
  );
}
