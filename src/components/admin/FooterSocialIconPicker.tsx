"use client";

import { useState } from "react";
import {
  FOOTER_SOCIAL_ICON_OPTIONS,
  FooterSocialIcon,
  type FooterSocialIconKind,
} from "@/components/layout/FooterSocialIcon";

function getIconLabel(value: string) {
  return (
    FOOTER_SOCIAL_ICON_OPTIONS.find((option) => option.value === value)?.label ?? "Website"
  );
}

export default function FooterSocialIconPicker({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (value: FooterSocialIconKind) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedValue =
    typeof value === "string" &&
    FOOTER_SOCIAL_ICON_OPTIONS.some((option) => option.value === value)
      ? (value as FooterSocialIconKind)
      : "globe";

  return (
    <div className="admin-icon-picker">
      <button
        type="button"
        className="admin-icon-picker__trigger footer-social-icon-picker__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Choose footer social icon"
      >
        <span className="admin-icon-picker__trigger-content">
          <span className="footer-social-icon-picker__preview">
            <FooterSocialIcon kind={selectedValue} />
          </span>
          {getIconLabel(selectedValue)}
        </span>
        <span className="admin-icon-picker__caret" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open ? (
        <div className="admin-icon-picker__panel">
          <div className="admin-icon-picker__grid footer-social-icon-picker__grid">
            {FOOTER_SOCIAL_ICON_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`admin-icon-picker__item footer-social-icon-picker__item ${
                  selectedValue === option.value ? "is-selected" : ""
                }`}
                title={option.label}
                aria-label={option.label}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <FooterSocialIcon kind={option.value} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
