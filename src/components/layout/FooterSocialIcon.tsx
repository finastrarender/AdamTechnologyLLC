import { Globe, Mail, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const FOOTER_SOCIAL_ICON_OPTIONS = [
  { value: "globe", label: "Website" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "mail", label: "Email" },
] as const;

export type FooterSocialIconKind = (typeof FOOTER_SOCIAL_ICON_OPTIONS)[number]["value"];

const FOOTER_SOCIAL_ICONS: Record<"mail" | "globe", LucideIcon> = {
  mail: Mail,
  globe: Globe,
};

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function renderIcon(kind: FooterSocialIconKind): ReactNode {
  if (kind === "linkedin") {
    return <LinkedinIcon className="site-footer__social-icon" />;
  }

  if (kind === "instagram") {
    return <InstagramIcon className="site-footer__social-icon" />;
  }

  const Icon = FOOTER_SOCIAL_ICONS[kind];
  return <Icon className="site-footer__social-icon" strokeWidth={1.75} aria-hidden="true" />;
}

export function FooterSocialIcon({ kind }: { kind?: string }) {
  const resolvedKind =
    kind && FOOTER_SOCIAL_ICON_OPTIONS.some((option) => option.value === kind)
      ? (kind as FooterSocialIconKind)
      : "globe";

  return renderIcon(resolvedKind);
}
