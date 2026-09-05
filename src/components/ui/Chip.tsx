import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  /** `glass` sits on photos and dark panels; `solid` on light surfaces. */
  variant?: "glass" | "solid" | "outline";
  className?: string;
};

/** Small pill label. 16px so it stays legible for the 45+ audience. */
export function Chip({ children, variant = "solid", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[2.25rem] items-center gap-2 rounded-full px-4 text-base font-medium leading-none",
        variant === "glass" && "border border-base/30 bg-base/15 text-on-ink backdrop-blur-md",
        variant === "solid" && "bg-alt text-ink",
        variant === "outline" && "border border-ink/20 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
