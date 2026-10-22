import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteShell({
  currentPath,
  children,
}: {
  currentPath: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader currentPath={currentPath} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter currentPath={currentPath} />
    </>
  );
}
