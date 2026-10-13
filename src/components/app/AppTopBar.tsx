"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, LineChart, Salad } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/app/dashboard", label: "Trang chủ", icon: Home },
  { href: "/app/schedule", label: "Lịch tập", icon: CalendarDays },
  { href: "/app/progress", label: "Tiến độ", icon: LineChart },
  { href: "/app/nutrition", label: "Dinh dưỡng", icon: Salad },
];

export default function AppTopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-surface-border/60 bg-background/90 backdrop-blur-md md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Logo href="/app/dashboard" />
        <nav className="flex items-center gap-1 rounded-full border border-surface-border bg-surface p-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-ink"
                    : "text-muted hover:text-foreground"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Về trang chủ
        </Link>
      </div>
    </header>
  );
}
