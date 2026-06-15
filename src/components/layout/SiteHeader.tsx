"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HashLink from "@/components/layout/HashLink";
export type NavItem = { label: string; href: string; active?: boolean };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({
  navItems,
  logoSrc,
  brandName = "Adam Technology",
}: {
  navItems: NavItem[];
  logoSrc?: string;
  brandName?: string;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.classList.add("site-nav-open");
    return () => {
      document.body.classList.remove("site-nav-open");
    };
  }, [isMenuOpen]);

  const validNavItems = navItems.filter(
    (item): item is { label: string; href: string; active?: boolean } =>
      typeof item?.href === "string" && item.href.trim() !== "" && typeof item?.label === "string" && item.label.trim() !== "",
  );
  const preferredNav = [
    { keys: ["home"], href: "/", label: "Home" },
    { keys: ["services"], href: "/services", label: "Services" },
    { keys: ["about", "about us"], href: "/about", label: "About" },
    { keys: ["project", "projects"], href: "/project", label: "Projects" },
    { keys: ["contact", "contact us"], href: "/contact", label: "Contact" },
  ];

  const displayNavItems = preferredNav
    .map(({ keys, href, label }) => {
      const found = validNavItems.find((item) => keys.includes(item.label.trim().toLowerCase()));
      if (found) return { ...found, label };
      return { label, href };
    })
    .slice(0, 5);

  return (
    <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
      <div className="site-header__inner">
        <div className="site-header__left">
          <Link className="brand" href="/" aria-label={`${brandName} home`}>
            {logoSrc?.trim() ? (
              <img
                className="brand__logo"
                src={logoSrc}
                alt={brandName}
                width={220}
                height={40}
                decoding="async"
              />
            ) : (
              <span className="brand__title">
                <span className="brand__name">Adam</span>
                <span className="brand__suffix"> Technology</span>
              </span>
            )}
          </Link>
        </div>

        <nav
          className={`site-nav${isMenuOpen ? " is-open" : ""}`}
          id="site-navigation"
          aria-label="Primary"
        >
          {displayNavItems.map((item) => {
            const active = isActive(pathname, item.href);
            const NavLink = item.href.includes("#") ? HashLink : Link;
            return (
              <NavLink
                key={item.label}
                className={`site-nav__link${active ? " site-nav__link--active" : ""}`}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {active && <span className="underline" />}
              </NavLink>
            );
          })}        </nav>

        <button
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__icon" aria-hidden="true">
            <span className="menu-toggle__line" />
            <span className="menu-toggle__line" />
            <span className="menu-toggle__line" />
          </span>
          <span className="visually-hidden">Toggle navigation</span>
        </button>

        <div className="site-header__actions">
          <Link
            href="/contact"
            className="header-button"
            aria-label="Inquire"
            onClick={() => setIsMenuOpen(false)}
          >
            Inquire
          </Link>
        </div>

        {isMenuOpen ? (
          <button
            type="button"
            className="site-nav-backdrop"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : null}
      </div>
    </header>
  );
}
