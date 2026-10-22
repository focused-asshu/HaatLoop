import { Logo } from "@/components/brand/logo";
import { navigation } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#main" aria-label="HaatLoop home">
              <Logo light />
            </a>
            <p>Fresh finds. Fairer prices. Less waste.</p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HaatLoop</p>
          <p>
            An early-stage idea for Odisha. Still learning, not taking orders.
          </p>
        </div>
      </div>
    </footer>
  );
}
