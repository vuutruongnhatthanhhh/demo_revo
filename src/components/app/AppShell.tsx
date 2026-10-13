"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
import AppTopBar from "@/components/app/AppTopBar";
import BottomNav from "@/components/app/BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { hydrated, selection } = useAppState();
  const pathname = usePathname();
  const router = useRouter();
  const isOnboarding = pathname === "/app/onboarding";

  useEffect(() => {
    if (!hydrated) return;
    if (!selection && !isOnboarding) {
      router.replace("/app/onboarding");
    }
  }, [hydrated, selection, isOnboarding, router]);

  if (!hydrated || (!selection && !isOnboarding)) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
          Đang tải REVO...
        </div>
      </div>
    );
  }

  if (isOnboarding) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <AppTopBar />
      <main className="flex-1 pb-24 md:pb-10">{children}</main>
      <BottomNav />
    </div>
  );
}
