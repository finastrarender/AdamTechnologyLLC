"use client";

import React, { useState } from "react";
import type { z } from "zod";
import type { contactInquiryDataSchema } from "@/schemas/sections";
import { buildContactMapEmbedUrl } from "@/lib/contact-map";
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
  { title: "Phone", lines: ["+971 4 338 7946"], icon: "phone" },
  { title: "Email", lines: ["info@adamtechnology.ae"], icon: "mail" },
  { title: "Website", lines: ["www.adamtechnology.ae"], icon: "globe" },
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

export default function ContactInquirySection({ content }: { content: ContactInquiryContent }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const formFields = content.formFields ?? {};
  const inquiryOptions =
    content.inquiryOptions?.length > 0 ? content.inquiryOptions : DEFAULT_INQUIRY_OPTIONS;
  const defaultInquiry = inquiryOptions[0] ?? "Cloud Architecture";
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
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
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("err");
        setMessage(json?.error?.message ?? "Something went wrong");
        return;
      }
      setStatus("ok");
      setMessage(formFields.successMessage ?? "Thank you - our consultants will be in touch shortly.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage(formFields.errorMessage ?? "Network error");
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

            <form className="contact-inquiry__form contact-inquiry__form--reference" onSubmit={onSubmit}>
              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.fullNameLabel ?? "Full Name"}</span>
                  <input
                    suppressHydrationWarning
                    name="name"
                    type="text"
                    required
                    className="contact-inquiry__input"
                    placeholder={formFields.fullNamePlaceholder ?? "John Doe"}
                  />
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.companyLabel ?? "Company Name"}</span>
                  <input
                    suppressHydrationWarning
                    name="company"
                    type="text"
                    className="contact-inquiry__input"
                    placeholder={formFields.companyPlaceholder ?? "Global Enterprise LLC"}
                  />
                </label>
              </div>

              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.workEmailLabel ?? "Business Email"}</span>
                  <input
                    suppressHydrationWarning
                    name="email"
                    type="email"
                    required
                    className="contact-inquiry__input"
                    placeholder={formFields.workEmailPlaceholder ?? "j.doe@enterprise.com"}
                  />
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.interestLabel ?? "Interest Area"}</span>
                  <select
                    suppressHydrationWarning
                    name="inquiryType"
                    required
                    defaultValue={defaultInquiry}
                    className="contact-inquiry__input contact-inquiry__select"
                  >
                    {inquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="contact-inquiry__field">
                <span>{formFields.messageLabel ?? "Project Brief"}</span>
                <textarea
                  suppressHydrationWarning
                  name="message"
                  required
                  rows={5}
                  className="contact-inquiry__input contact-inquiry__textarea"
                  placeholder={formFields.messagePlaceholder ?? "Describe your technical requirements..."}
                />
              </label>

              <input suppressHydrationWarning name="phone" type="hidden" value="" readOnly />
              <button suppressHydrationWarning type="submit" className="contact-inquiry__submit" disabled={status === "loading"}>
                <span>{status === "loading" ? "Submitting..." : content.submitLabel ?? "Submit Inquiry"}</span>
              </button>
              <p className="contact-inquiry__status-note">
                {formFields.disclaimerText ?? "Your data is protected under UAE Federal Decree-Law No. 45 of 2021."}
              </p>
              {message ? <p className={status === "ok" ? "contact-form__ok" : "contact-form__err"}>{message}</p> : null}
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
              {contactItems.map((item) => (
                <p key={`${item.icon}-${item.lines[0]}`}>
                  <SimpleIcon name={item.icon} className="contact-inquiry__contact-icon" />
                  <span>{item.lines[0]}</span>
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
