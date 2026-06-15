"use client";

import { useState, type ReactNode } from "react";
import {
  SERVICES_GRID_ICON_OPTIONS,
  resolveServicesGridIcon,
  type ServicesGridIconKind,
} from "@/components/services/services-grid-icon-utils";

export { SERVICES_GRID_ICON_OPTIONS, resolveServicesGridIcon, type ServicesGridIconKind };

const SVG_CLASS = "services-grid-card__icon";

function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={SVG_CLASS}>
      {children}
    </svg>
  );
}

export function ServicesGridIcon({ kind }: { kind?: string }) {
  const resolved = resolveServicesGridIcon(kind);

  switch (resolved) {
    case "cloud":
      return (
        <IconSvg>
          <path
            d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-1.4A3.5 3.5 0 0 0 7 18z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </IconSvg>
      );
    case "database":
      return (
        <IconSvg>
          <ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "blockchain":
      return (
        <IconSvg>
          <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.8 7.4 10.4 16M16.2 7.4 13.6 16M8 6h8" stroke="currentColor" strokeWidth="1.4" />
        </IconSvg>
      );
    case "code":
      return (
        <IconSvg>
          <path
            d="M8 8l4 4-4 4M13 16h3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </IconSvg>
      );
    case "network":
      return (
        <IconSvg>
          <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </IconSvg>
      );
    case "lock":
      return (
        <IconSvg>
          <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "server":
      return (
        <IconSvg>
          <rect x="3" y="4" width="18" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="13" width="18" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <line x1="7" y1="7.5" x2="7.01" y2="7.5" stroke="currentColor" strokeWidth="1.6" />
          <line x1="7" y1="16.5" x2="7.01" y2="16.5" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "analytics":
      return (
        <IconSvg>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "settings":
      return (
        <IconSvg>
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </IconSvg>
      );
    case "globe":
      return (
        <IconSvg>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "users":
      return (
        <IconSvg>
          <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M22 19v-1a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </IconSvg>
      );
    case "shield":
    default:
      return (
        <IconSvg>
          <path
            d="M12 2 4 5.5v6.2c0 4.8 3.2 8.4 8 10.3 4.8-1.9 8-5.5 8-10.3V5.5L12 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </IconSvg>
      );
  }
}

function getIconLabel(value: string) {
  return (
    SERVICES_GRID_ICON_OPTIONS.find((option) => option.value === value)?.label ??
    "Cybersecurity (shield)"
  );
}

export function ServicesGridIconPicker({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (value: ServicesGridIconKind) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedValue = resolveServicesGridIcon(typeof value === "string" ? value : undefined);

  const filtered = SERVICES_GRID_ICON_OPTIONS.filter(
    (option) =>
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.value.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-icon-picker">
      <button
        type="button"
        className="admin-icon-picker__trigger services-grid-icon-picker__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Choose service icon"
      >
        <span className="admin-icon-picker__trigger-content">
          <span className="services-grid-icon-picker__preview">
            <ServicesGridIcon kind={selectedValue} />
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
          <div className="admin-icon-picker__grid services-grid-icon-picker__grid">
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`admin-icon-picker__item services-grid-icon-picker__item ${
                  selectedValue === option.value ? "is-selected" : ""
                }`}
                title={option.label}
                aria-label={option.label}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <ServicesGridIcon kind={option.value} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
