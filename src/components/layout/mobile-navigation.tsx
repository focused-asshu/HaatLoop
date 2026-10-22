"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/site";
import Link from "next/link";

export function MobileNavigation({
  currentPath = "/",
}: {
  currentPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const media = window.matchMedia("(min-width: 900px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, [open]);
  return (
    <div
      className="mobile-navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          close();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className="menu-trigger"
        ref={trigger}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <nav
        id="mobile-nav"
        ref={panel}
        aria-label="Mobile navigation"
        className="mobile-panel"
        hidden={!open}
      >
        {navigation.map((item, index) => (
          <Link
            prefetch={false}
            key={item.href}
            href={item.href}
            onClick={close}
            aria-current={currentPath === item.href ? "page" : undefined}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
        <p>Early concept. Real orders aren’t available.</p>
      </nav>
    </div>
  );
}
