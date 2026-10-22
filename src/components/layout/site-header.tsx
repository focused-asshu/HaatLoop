import { Logo } from "@/components/brand/logo";
import { navigation } from "@/config/site";
import { MobileNavigation } from "./mobile-navigation";
import Link from "next/link";

export function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link prefetch={false} href="/" aria-label="HaatLoop home">
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          prefetch={false}
          className="button header-cta"
          href="/marketplace"
        >
          Explore the preview <span aria-hidden="true">→</span>
        </Link>
        <MobileNavigation currentPath={currentPath} />
      </div>
    </header>
  );
}
