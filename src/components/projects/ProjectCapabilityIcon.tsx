"use client";

import {
  Bot,
  CloudCheck,
  Code2,
  Database,
  LineChart,
  Link2,
  Lock,
  Network,
  Rocket,
  Server,
  ShieldUser,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

export const PROJECT_CAPABILITY_ICON_OPTIONS = [
  { value: "network", label: "Network Infrastructure" },
  { value: "blockchain", label: "Blockchain Integration" },
  { value: "security", label: "Cybersecurity Solutions" },
  { value: "cloud", label: "Cloud Architecture" },
  { value: "automation", label: "Enterprise Automation" },
  { value: "consulting", label: "Digital Consulting" },
  { value: "database", label: "Data & Storage" },
  { value: "server", label: "Server Infrastructure" },
  { value: "code", label: "Software Development" },
  { value: "integration", label: "System Integration" },
  { value: "analytics", label: "Analytics & Insights" },
  { value: "encryption", label: "Encryption & Privacy" },
] as const;

export type ProjectCapabilityIconKind =
  (typeof PROJECT_CAPABILITY_ICON_OPTIONS)[number]["value"];

const PROJECT_CAPABILITY_ICONS: Record<ProjectCapabilityIconKind, LucideIcon> = {
  network: Network,
  blockchain: Link2,
  security: ShieldUser,
  cloud: CloudCheck,
  automation: Bot,
  consulting: Rocket,
  database: Database,
  server: Server,
  code: Code2,
  integration: Waypoints,
  analytics: LineChart,
  encryption: Lock,
};

const ICON_PROPS = {
  className: "projects-capabilities__icon-svg",
  strokeWidth: 2,
  "aria-hidden": true as const,
};

export function ProjectCapabilityIcon({ kind }: { kind?: string }) {
  const Icon =
    kind && kind in PROJECT_CAPABILITY_ICONS
      ? PROJECT_CAPABILITY_ICONS[kind as ProjectCapabilityIconKind]
      : Network;

  return <Icon {...ICON_PROPS} />;
}

function getIconLabel(value: string) {
  return (
    PROJECT_CAPABILITY_ICON_OPTIONS.find((option) => option.value === value)?.label ??
    "Network Infrastructure"
  );
}

export function ProjectCapabilityIconPicker({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (value: ProjectCapabilityIconKind) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedValue =
    typeof value === "string" &&
    PROJECT_CAPABILITY_ICON_OPTIONS.some((option) => option.value === value)
      ? (value as ProjectCapabilityIconKind)
      : "network";

  const filtered = PROJECT_CAPABILITY_ICON_OPTIONS.filter(
    (option) =>
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.value.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-icon-picker">
      <button
        type="button"
        className="admin-icon-picker__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Choose capability icon"
      >
        <span className="admin-icon-picker__trigger-content">
          <span className="project-capability-icon-picker__preview">
            <ProjectCapabilityIcon kind={selectedValue} />
          </span>
          {getIconLabel(selectedValue)}
        </span>
        <span className="admin-icon-picker__caret" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open ? (
        <div className="admin-icon-picker__panel">
          <input
            placeholder="Search icon..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="admin-icon-picker__search"
          />
          <div className="admin-icon-picker__grid project-capability-icon-picker__grid">
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`admin-icon-picker__item project-capability-icon-picker__item ${
                  selectedValue === option.value ? "is-selected" : ""
                }`}
                title={option.label}
                aria-label={option.label}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <ProjectCapabilityIcon kind={option.value} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
