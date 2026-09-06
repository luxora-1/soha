import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "sm";

/**
 * Buttons are pills with a small, tracked, uppercase label ("TAKE THE 2-MIN
 * QUIZ"), the house style of the brand identity. They lift a little on hover,
 * settle on press, and a band of light sweeps across the filled variants (a
 * wide gradient whose position is animated).
 */
const base =
  "group relative isolate inline-flex min-h-tap items-center justify-center gap-2 whitespace-nowrap rounded-full text-center font-sans text-[0.875rem] font-semibold uppercase leading-tight tracking-[0.08em] transition-[transform,background-color,box-shadow,color] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-8 py-[1.0625rem]",
  sm: "px-5 py-3 text-[0.8125rem]",
};

/** The sweeping highlight: a gradient band far wider than the button, moved across it on hover. */
const sheen = "bg-[length:250%_100%] bg-[position:200%_0] bg-no-repeat motion-safe:hover:animate-sheen";

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-brand text-on-brand shadow-[0_12px_28px_-14px_rgb(var(--primary-rgb)/0.55)] hover:bg-brand-hover hover:shadow-[0_18px_36px_-16px_rgb(var(--primary-rgb)/0.65)] active:bg-brand-hover",
    "bg-[linear-gradient(110deg,transparent_42%,rgb(var(--bg-rgb)/0.22)_50%,transparent_58%)]",
    sheen,
  ),
  secondary: "border border-ink bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10",
  /** Light button for dark panels (bg-ink, bg-primary). */
  inverse: cn(
    "bg-base text-ink shadow-[0_12px_28px_-14px_rgb(var(--ink-rgb)/0.45)] hover:bg-alt active:bg-alt focus-visible:outline-base",
    "bg-[linear-gradient(110deg,transparent_42%,rgb(var(--ink-rgb)/0.07)_50%,transparent_58%)]",
    sheen,
  ),
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type CTAButtonProps = LinkProps | ButtonProps;

/**
 * Primary call-to-action. Renders a Next `<Link>` when given `href`, otherwise
 * a `<button>`. Both variants meet the 44px minimum tap target.
 */
export function CTAButton(props: CTAButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as LinkProps;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
