import { Logo } from "@/components/brand/logo";
import { navigation } from "@/config/site";
import Link from "next/link";

export function SiteFooter({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link prefetch={false} href="/" aria-label="HaatLoop home">
              <Logo light />
            </Link>
            <p>Fresh finds. Fairer prices. Less waste.</p>
          </div>
          <nav aria-label="Footer navigation">
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
            <Link prefetch={false} href="/#safety">
              Our principles
            </Link>
            <Link prefetch={false} href="/#faq">
              FAQs
            </Link>
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
