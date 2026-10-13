import Link from "next/link";
import clsx from "clsx";

export default function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 font-display font-bold tracking-tight",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-ink text-sm font-extrabold">
        R
      </span>
      <span className="text-lg text-foreground">REVO</span>
    </Link>
  );
}
