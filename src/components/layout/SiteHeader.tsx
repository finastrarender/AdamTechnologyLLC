"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export type NavItem = { label: string; href: string; active?: boolean };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const applyParams = new URLSearchParams(searchParams.toString());
  applyParams.set("apply", "1");
  const applyHref = `${pathname}${applyParams.toString() ? `?${applyParams.toString()}` : ""}`;

  const validNavItems = navItems.filter(
    (item): item is { label: string; href: string; active?: boolean } =>
      typeof item?.href === "string" && item.href.trim() !== "" && typeof item?.label === "string" && item.label.trim() !== "",
  );
  const preferredNav = [
    { keys: ["home"], href: "/", label: "HOME" },
    { keys: ["services"], href: "/services", label: "SERVICES" },
    { keys: ["about", "about us"], href: "/about", label: "ABOUT US" },
    { keys: ["contact", "contact us"], href: "/contact", label: "CONTACT" },
  ];

  const displayNavItems = preferredNav
    .map(({ keys, href, label }) => {
      const found = validNavItems.find((item) => keys.includes(item.label.trim().toLowerCase()));
      if (found) return { ...found, label };
      return { label, href };
    })
    .slice(0, 4);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__left">
          <Link className="brand" href="/" aria-label="One World home">
            <span className="brand__title">ADAMTECH</span>
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__line"></span>
          <span className="menu-toggle__line"></span>
          <span className="menu-toggle__line"></span>
          <span className="visually-hidden">Toggle navigation</span>
        </button>

        <nav
          className={`site-nav${isMenuOpen ? " is-open" : ""}`}
          id="site-navigation"
          aria-label="Primary"
        >
          {displayNavItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                className={`site-nav__link${active ? " site-nav__link--active" : ""}`}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {active && (<span className="underline"></span>)}
              </Link>
            );
          })}
        </nav>
        <div className="site-header__actions">
          <span className="header-badge">DUBAI LICENSED</span>
          <Link href={applyHref} className="header-button" aria-label="Inquire">
            INQUIRE
          </Link>
        </div>
      </div>
    </header>
  );
}
