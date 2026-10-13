"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Dumbbell, LayoutDashboard, Users } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/exercises", label: "Bài tập", icon: Dumbbell, exact: false },
  { href: "/admin/members", label: "Học viên", icon: Users, exact: false },
];

export default function AdminTopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-surface-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Logo href="/admin" />
          <span className="rounded-full border border-surface-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Admin
          </span>
        </div>

        <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border border-surface-border bg-surface p-1">
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
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
          href="/app/dashboard"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Xem giao diện học viên
        </Link>
      </div>
    </header>
  );
}
