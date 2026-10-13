import { AdminExercisesProvider } from "@/context/AdminExercisesContext";
import { AdminMembersProvider } from "@/context/AdminMembersContext";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminExercisesProvider>
      <AdminMembersProvider>
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopBar />
          <main className="flex-1 pb-16">{children}</main>
        </div>
      </AdminMembersProvider>
    </AdminExercisesProvider>
  );
}
