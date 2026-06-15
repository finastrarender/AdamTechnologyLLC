export const SERVICES_GRID_ICON_OPTIONS = [
  { value: "shield", label: "Cybersecurity (shield)" },
  { value: "cloud", label: "Cloud" },
  { value: "database", label: "Data & analytics" },
  { value: "blockchain", label: "Blockchain" },
  { value: "code", label: "Software development" },
  { value: "network", label: "Network infrastructure" },
  { value: "lock", label: "Encryption & privacy" },
  { value: "server", label: "Server infrastructure" },
  { value: "analytics", label: "Analytics & insights" },
  { value: "settings", label: "Automation" },
  { value: "globe", label: "Global / web" },
  { value: "users", label: "Consulting & teams" },
] as const;

export type ServicesGridIconKind = (typeof SERVICES_GRID_ICON_OPTIONS)[number]["value"];

const ICON_ALIASES: Record<string, ServicesGridIconKind> = {
  shield: "shield",
  security: "shield",
  cloud: "cloud",
  online: "cloud",
  database: "database",
  data: "database",
  blockchain: "blockchain",
  code: "code",
  innovation: "code",
  software: "code",
  network: "network",
  nodes: "network",
  corporate: "network",
  lock: "lock",
  encryption: "lock",
  server: "server",
  analytics: "analytics",
  chart: "analytics",
  lineChart: "analytics",
  settings: "settings",
  automation: "settings",
  globe: "globe",
  web: "globe",
  users: "users",
  consulting: "users",
  headset: "users",
};

export function resolveServicesGridIcon(icon?: string): ServicesGridIconKind {
  return ICON_ALIASES[icon ?? ""] ?? "shield";
}
