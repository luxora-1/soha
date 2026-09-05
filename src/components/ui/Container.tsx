import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Horizontal layout container. Content box is capped at `max-w-content`
 * (1200px); gutters are added outside the content box via `box-content`.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto box-content max-w-content px-6 md:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
