import Link from "next/link";

type FooterLink = { label: string; href: string };
type FooterMetaLink = { label: string; href: string; icon?: string };
type FooterColumn =
  | { title: string; links: FooterLink[] }
  | { title: string; contact: Array<{ type: "location" | "phone" | "mail"; value: string }> };

export default function SiteFooter({
  columns: _columns,
  meta,
}: {
  columns: FooterColumn[];
  meta: {
    brand: string;
    description: string;
    social: Array<string | FooterMetaLink>;
    copyright: string;
    legal: Array<string | FooterMetaLink>;
  };
}) {
  const legalLinks = [
    { label: "PRIVACY POLICY", href: "/privacy" },
    { label: "TERMS OF SERVICE", href: "/terms" },
    { label: "SYSTEM STATUS", href: "/status" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="site-footer__bar">
          <div className="site-footer__left">
            <p className="site-footer__brand">ADAM TECH</p>
            <p className="site-footer__copyright">
              © 2024 ADAM TECHNOLOGY L.L.C. ALL RIGHTS RESERVED. DUBAI LICENSED.
            </p>
          </div>
          <nav className="site-footer__legal" aria-label="Footer legal">
            {legalLinks.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={item.label.trim().toLowerCase() === "contact" ? "is-highlight" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
