"use client";

import React, { useState } from "react";
import type { z } from "zod";
import type { contactInquiryDataSchema } from "@/schemas/sections";
import { buildContactMapEmbedUrl } from "@/lib/contact-map";
import {
  validateContactForm,
  type ContactFormFieldErrors,
} from "@/lib/contact-form-validation";
import {
  isExternalContactHref,
  resolveContactItemHref,
} from "@/lib/contact-item-link";
import SimpleIcon from "../SimpleIcon";

type ContactInquiryContent = z.infer<typeof contactInquiryDataSchema>;

const DEFAULT_INQUIRY_OPTIONS = [
  "Cloud Architecture",
  "Cybersecurity",
  "Cloud & Data",
  "Software Engineering",
  "Consulting",
  "Managed Services",
];

const DEFAULT_CONTACT_ITEMS = [
  {
    title: "Phone",
    lines: ["+971 4 338 7946"],
    icon: "phone",
    href: "tel:+97143387946",
  },
  {
    title: "Email",
    lines: ["info@adamtechnology.ae"],
    icon: "mail",
    href: "mailto:info@adamtechnology.ae",
  },
  {
    title: "Website",
    lines: ["www.adamtechnology.ae"],
    icon: "globe",
    href: "https://www.adamtechnology.ae",
  },
];

function resolveOfficeLocation(content: ContactInquiryContent) {
  const location = content.officeItems?.[0];
  return {
    title: location?.title ?? "ADAM TECHNOLOGY LLC",
    subtitle: location?.lines?.[0] ?? "ART XV RESIDENCY",
    address:
      location?.lines?.slice(1).join(", ") ??
      "Office 103, Marasi Dr, Business Bay, Dubai, UAE",
  };
}

function resolveContactItems(content: ContactInquiryContent) {
  const items = content.officeItems?.slice(1) ?? [];
  return items.length > 0 ? items : DEFAULT_CONTACT_ITEMS;
}

function fieldClass(hasError: boolean) {
  return `contact-inquiry__input${hasError ? " contact-inquiry__input--error" : ""}`;
}

export default function ContactInquirySection({ content }: { content: ContactInquiryContent }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});
  const formFields = content.formFields ?? {};
  const inquiryOptions =
    content.inquiryOptions?.length > 0 ? content.inquiryOptions : DEFAULT_INQUIRY_OPTIONS;
  const office = resolveOfficeLocation(content);
  const contactItems = resolveContactItems(content);
  const mapEmbedUrl = buildContactMapEmbedUrl(office.address, content.mapEmbedUrl);
  const heroTitle =
    content.heroTitleLines?.length && content.heroTitleLines.some((line) => line.trim())
      ? content.heroTitleLines.join(" ")
      : "Secure Connection";
  const heroDescription =
    content.heroSideCopy?.trim() ||
    content.formDescription?.trim() ||
    "Contact our strategic advisory team to deploy enterprise-grade solutions tailored for high-stakes environments.";

  function clearFieldError(field: keyof ContactFormFieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      inquiryType: String(fd.get("inquiryType") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const validation = validateContactForm(body);
    if (!validation.success) {
      setStatus("err");
      setFieldErrors(validation.errors);
      setMessage(validation.message);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("err");
        const details = json?.error?.details as { fieldErrors?: ContactFormFieldErrors } | undefined;
        if (details?.fieldErrors) setFieldErrors(details.fieldErrors);
        setMessage(json?.error?.message ?? formFields.errorMessage ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      setMessage(
        formFields.successMessage ?? "Thank you - our consultants will be in touch shortly.",
      );
      form.reset();
    } catch {
      setStatus("err");
      setMessage(formFields.errorMessage ?? "Network error. Please try again.");
    }
  }

  return (
    <section className="contact-inquiry contact-inquiry--reference">
      <div className="contact-inquiry__hero-band">
        <div className="section-shell">
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
        </div>
      </div>

      <div className="section-shell contact-inquiry__reference-shell">
        <div className="contact-inquiry__content-row">
          <div className="contact-inquiry__content-left">
            <h2 className="contact-inquiry__panel-title">
              {content.formTitle ?? "Initialize Engagement"}
            </h2>

            <form
              className="contact-inquiry__form contact-inquiry__form--reference"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.fullNameLabel ?? "Full Name"}</span>
                  <input
                    suppressHydrationWarning
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass(Boolean(fieldErrors.name))}
                    placeholder={formFields.fullNamePlaceholder ?? "John Doe"}
                    onChange={() => clearFieldError("name")}
                  />
                  {fieldErrors.name ? (
                    <p className="contact-inquiry__field-error">{fieldErrors.name}</p>
                  ) : null}
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.companyLabel ?? "Company Name"}</span>
                  <input
                    suppressHydrationWarning
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={fieldClass(Boolean(fieldErrors.company))}
                    placeholder={formFields.companyPlaceholder ?? "Global Enterprise LLC"}
                    onChange={() => clearFieldError("company")}
                  />
                  {fieldErrors.company ? (
                    <p className="contact-inquiry__field-error">{fieldErrors.company}</p>
                  ) : null}
                </label>
              </div>

              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.workEmailLabel ?? "Email Address"}</span>
                  <input
                    suppressHydrationWarning
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass(Boolean(fieldErrors.email))}
                    placeholder={formFields.workEmailPlaceholder ?? "j.doe@enterprise.com"}
                    onChange={() => clearFieldError("email")}
                  />
                  {fieldErrors.email ? (
                    <p className="contact-inquiry__field-error">{fieldErrors.email}</p>
                  ) : null}
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.interestLabel ?? "Interest Area"}</span>
                  <select
                    suppressHydrationWarning
                    name="inquiryType"
                    defaultValue=""
                    className={`${fieldClass(Boolean(fieldErrors.inquiryType))} contact-inquiry__select`}
                    onChange={() => clearFieldError("inquiryType")}
                  >
                    <option value="" disabled>
                      Please select an interest area
                    </option>
                    {inquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.inquiryType ? (
                    <p className="contact-inquiry__field-error">{fieldErrors.inquiryType}</p>
                  ) : null}
                </label>
              </div>

              <label className="contact-inquiry__field">
                <span>{formFields.messageLabel ?? "Project Brief"}</span>
                <textarea
                  suppressHydrationWarning
                  name="message"
                  rows={5}
                  className={`${fieldClass(Boolean(fieldErrors.message))} contact-inquiry__textarea`}
                  placeholder={formFields.messagePlaceholder ?? "Describe your technical requirements..."}
                  onChange={() => clearFieldError("message")}
                />
                {fieldErrors.message ? (
                  <p className="contact-inquiry__field-error">{fieldErrors.message}</p>
                ) : null}
              </label>

              <input suppressHydrationWarning name="phone" type="hidden" value="" readOnly />
              <button
                suppressHydrationWarning
                type="submit"
                className="contact-inquiry__submit"
                disabled={status === "loading"}
              >
                <span>{status === "loading" ? "Submitting..." : content.submitLabel ?? "Submit Inquiry"}</span>
              </button>
              <p className="contact-inquiry__status-note">
                {formFields.disclaimerText ?? "Your data is protected under UAE Federal Decree-Law No. 45 of 2021."}
              </p>
              {message ? (
                <p
                  className={`contact-inquiry__form-message ${
                    status === "ok"
                      ? "contact-inquiry__form-message--success"
                      : "contact-inquiry__form-message--error"
                  }`}
                  role={status === "ok" ? "status" : "alert"}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>

          <aside className="contact-inquiry__content-right">
            <div className="contact-inquiry__ops-card">
              <div className="contact-inquiry__office-header">
                <span className="contact-inquiry__office-icon" aria-hidden="true">
                  <SimpleIcon name="location" className="contact-inquiry__office-icon-svg" />
                </span>
                <div>
                  <h3>{office.title}</h3>
                  <p>{office.subtitle}</p>
                </div>
              </div>
              <address className="contact-inquiry__address">{office.address}</address>
              <div className="contact-inquiry__map">
                <iframe
                  className="contact-inquiry__map-frame"
                  src={mapEmbedUrl}
                  title={`Map showing ${office.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="contact-inquiry__contact-card">
              {contactItems.map((item) => {
                const href = resolveContactItemHref(item);
                const label = item.lines[0] ?? "";
                const content = (
                  <>
                    <SimpleIcon name={item.icon} className="contact-inquiry__contact-icon" />
                    <span>{label}</span>
                  </>
                );

                if (!href) {
                  return (
                    <p key={`${item.icon}-${label}`} className="contact-inquiry__contact-entry">
                      {content}
                    </p>
                  );
                }

                return (
                  <a
                    key={`${item.icon}-${label}`}
                    href={href}
                    className="contact-inquiry__contact-link"
                    {...(isExternalContactHref(href)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
