import { AppStateProvider } from "@/context/AppStateContext";
import AppShell from "@/components/app/AppShell";

export default function AppSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppStateProvider>
      <AppShell>{children}</AppShell>
    </AppStateProvider>
  );
}
