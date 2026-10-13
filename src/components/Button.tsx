import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:brightness-110 shadow-[0_0_0_0_rgba(215,255,61,0.4)] hover:shadow-[0_0_24px_4px_rgba(215,255,61,0.25)]",
  secondary: "bg-surface-2 text-foreground hover:bg-surface-2/70 border border-surface-border",
  ghost: "bg-transparent text-foreground hover:bg-surface-2",
  outline: "bg-transparent border border-surface-border text-foreground hover:border-accent/60",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  href,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
      {icon}
    </Link>
  );
}
