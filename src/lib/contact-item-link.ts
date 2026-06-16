export type ContactInfoItem = {
  title: string;
  lines: string[];
  icon: string;
  href?: string;
};

export function resolveContactItemHref(item: ContactInfoItem): string | null {
  const custom = item.href?.trim();
  if (custom) return custom;

  const value = item.lines[0]?.trim();
  if (!value) return null;

  const icon = item.icon.trim().toLowerCase();

  if (icon === "phone" || icon.includes("phone")) {
    const digits = value.replace(/[^\d+]/g, "");
    return digits ? `tel:${digits}` : null;
  }

  if (icon === "mail" || icon === "email" || icon.includes("mail")) {
    const email = value.replace(/^mailto:/i, "").trim();
    return email.includes("@") ? `mailto:${email}` : null;
  }

  if (
    icon === "globe" ||
    icon === "website" ||
    icon.includes("globe") ||
    icon.includes("web")
  ) {
    if (/^https?:\/\//i.test(value)) return value;
    if (value.includes(".")) return `https://${value.replace(/^\/\//, "")}`;
    return null;
  }

  return null;
}

export function isExternalContactHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
