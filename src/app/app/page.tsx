"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";

export default function AppIndexPage() {
  const router = useRouter();
  const { hydrated, selection } = useAppState();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(selection ? "/app/dashboard" : "/app/onboarding");
  }, [hydrated, selection, router]);

  return null;
}
