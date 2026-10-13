import Logo from "@/components/Logo";
import { LinkButton } from "@/components/Button";

const NAV_LINKS = [
  { href: "#features", label: "Tính năng" },
  { href: "#how-it-works", label: "Cách hoạt động" },
  { href: "#nutrition", label: "Dinh dưỡng" },
];

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <LinkButton href="/app/onboarding" size="sm">
          Bắt đầu ngay
        </LinkButton>
      </div>
    </header>
  );
}
