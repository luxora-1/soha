import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  /** Use a heading element when the eyebrow is the section's heading. */
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
};

/** Small uppercase label that sits above a heading. 12px / 0.12em tracking, in the brand colour. */
export function Eyebrow({
  as: Tag = "p",
  className,
  id,
  children,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-sans text-eyebrow uppercase tracking-eyebrow text-primary",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
