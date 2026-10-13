"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CalendarDays, Home, LineChart, Salad } from "lucide-react";

const NAV_ITEMS = [
  { href: "/app/dashboard", label: "Trang chủ", icon: Home },
  { href: "/app/schedule", label: "Lịch tập", icon: CalendarDays },
  { href: "/app/progress", label: "Tiến độ", icon: LineChart },
  { href: "/app/nutrition", label: "Dinh dưỡng", icon: Salad },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-surface/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-accent" : "text-muted"
              )}
            >
              <item.icon size={20} strokeWidth={active ? 2.4 : 2} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
