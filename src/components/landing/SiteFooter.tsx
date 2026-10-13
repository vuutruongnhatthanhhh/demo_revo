import Link from "next/link";
import Logo from "@/components/Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-surface-border/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted">
              Train on Your Own Terms. Tập luyện theo cách phù hợp với bạn —
              lịch tập, video hướng dẫn và dinh dưỡng cá nhân hóa trong một
              trải nghiệm duy nhất.
            </p>
          </div>
          <div className="text-sm text-muted">
            <p>© 2026 REVO. Bản demo giao diện.</p>
            <Link href="/admin" className="mt-2 inline-block text-xs text-muted/70 hover:text-accent">
              Trang quản trị (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
