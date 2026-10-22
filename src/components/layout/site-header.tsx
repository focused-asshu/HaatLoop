import { Logo } from "@/components/brand/logo";
import { navigation } from "@/config/site";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="#main" aria-label="HaatLoop home">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button header-cta" href="#preview">
          Explore the preview <span aria-hidden="true">↗</span>
        </a>
        <MobileNavigation />
      </div>
    </header>
  );
}
