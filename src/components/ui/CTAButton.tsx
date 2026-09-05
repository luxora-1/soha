import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "inline-flex min-h-tap items-center justify-center gap-2 rounded-full text-center font-sans text-base font-medium leading-tight transition-colors duration-200 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-8 py-4",
  sm: "px-6 py-3",
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-hover",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10",
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
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
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
