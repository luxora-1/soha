import { cn } from "@/lib/cn";

type ProductPillProps = { name: string; form: string; tone?: "light" | "dark"; className?: string };

/** "Estrada · Combination cream" as a filled name pill (serif) and an outlined form chip. */
export function ProductPill({ name, form, tone = "light", className }: ProductPillProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex min-h-[2.25rem] items-center rounded-full px-4 font-serif text-[1.375rem] leading-none tracking-[-0.01em]",
          dark ? "bg-base text-primary" : "bg-primary text-on-primary",
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          "inline-flex min-h-[2.25rem] items-center rounded-full px-3 text-[0.875rem] font-medium leading-none ring-1 ring-inset",
          dark ? "text-on-panel ring-base/50" : "text-primary ring-primary/50",
        )}
      >
        {form}
      </span>
    </span>
  );
}
