import { cn } from "@/lib/cn";

/** Decorative film-grain overlay. Parent must be `relative`. */
export function Grain({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-grain bg-[length:200px_200px] opacity-[0.18] mix-blend-multiply",
        className,
      )}
    />
  );
}
