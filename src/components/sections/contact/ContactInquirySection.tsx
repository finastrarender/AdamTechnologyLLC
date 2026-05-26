"use client";

import React, { useState } from "react";
import type { z } from "zod";
import type { contactInquiryDataSchema } from "@/schemas/sections";
import SimpleIcon from "../SimpleIcon";

type ContactInquiryContent = z.infer<typeof contactInquiryDataSchema>;

export default function ContactInquirySection({ content }: { content: ContactInquiryContent }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const formFields = content.formFields ?? {};
  const heroEyebrow = content.heroEyebrow ?? "PROTOCOL: COMMUNICATION";
  const heroTitleLines =
    content.heroTitleLines && content.heroTitleLines.length > 0
      ? content.heroTitleLines
      : ["CONNECT", "SECURELY"];
  const heroSideCopy =
    content.heroSideCopy ??
    "ENTERPRISE-GRADE COMMUNICATION NODES FOR INDUSTRIAL SCALING AND TECHNOLOGICAL SOVEREIGNTY.";
  const mapImage = content.mapImage?.trim() || "/home/hero-bg.jpg";
  const mapLabelTitle = content.mapLabelTitle?.trim() || "ADAM HQ DUBAI";
  const mapLabelSubtitle = content.mapLabelSubtitle?.trim() || "";
  const mapLabel = mapLabelSubtitle ? `${mapLabelTitle} • ${mapLabelSubtitle}` : mapLabelTitle;

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
      setMessage(formFields.successMessage ?? "Thank you — our consultants will be in touch shortly.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage(formFields.errorMessage ?? "Network error");
    }
  }

  return (
    <section className="contact-inquiry contact-inquiry--reference">
      <div className="section-shell contact-inquiry__reference-shell">
        <div className="contact-inquiry__hero-row">
          <div className="contact-inquiry__hero-left">
            <p className="contact-inquiry__eyebrow">{heroEyebrow}</p>
            <h2 className="contact-inquiry__reference-title">
              {heroTitleLines.map((line, index) => (
                <span key={`${line}-${index}`}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="contact-inquiry__hero-right" aria-label="Enterprise description">
            <span className="contact-inquiry__hero-divider" aria-hidden="true" />
            <p className="contact-inquiry__side-copy">{heroSideCopy}</p>
          </div>
        </div>

        <div className="contact-inquiry__content-row">
          <div className="contact-inquiry__content-left">
            <div className="contact-inquiry__heading-block">
              <h3>{content.formTitle}</h3>
              <p>{content.formDescription}</p>
            </div>

            <form className="contact-inquiry__form contact-inquiry__form--reference" onSubmit={onSubmit}>
              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.fullNameLabel ?? "Identifier / Name"}</span>
                  <input
                    suppressHydrationWarning
                    name="name"
                    type="text"
                    required
                    className="contact-inquiry__input"
                    placeholder={formFields.fullNamePlaceholder ?? "ENTER FULL NAME"}
                  />
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.companyLabel ?? "Organization / Company"}</span>
                  <input
                    suppressHydrationWarning
                    name="company"
                    type="text"
                    className="contact-inquiry__input"
                    placeholder={formFields.companyPlaceholder ?? "ENTER COMPANY NAME"}
                  />
                </label>
              </div>
              <div className="contact-inquiry__row">
                <label className="contact-inquiry__field">
                  <span>{formFields.workEmailLabel ?? "Secure Email Endpoint"}</span>
                  <input
                    suppressHydrationWarning
                    name="email"
                    type="email"
                    required
                    className="contact-inquiry__input"
                    placeholder={formFields.workEmailPlaceholder ?? "EMAIL@DOMAIN.COM"}
                  />
                </label>
                <label className="contact-inquiry__field">
                  <span>{formFields.interestLabel ?? "Operation Type / Service"}</span>
                  <select suppressHydrationWarning name="inquiryType" required className="contact-inquiry__input contact-inquiry__select">
                    <option value="">{formFields.interestPlaceholder ?? "SELECT INFRASTRUCTURE MODULE"}</option>
                    {content.inquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="contact-inquiry__field">
                <span>{formFields.messageLabel ?? "Message Payload"}</span>
                <textarea
                  suppressHydrationWarning
                  name="message"
                  required
                  rows={4}
                  className="contact-inquiry__input contact-inquiry__textarea"
                  placeholder={formFields.messagePlaceholder ?? "TRANSMIT YOUR REQUIREMENTS..."}
                />
              </label>
              <input suppressHydrationWarning name="phone" type="hidden" value="" readOnly />
              <div className="contact-inquiry__footer-row">
                <p className="contact-inquiry__status-note">
                  <span className="contact-inquiry__status-dot" aria-hidden="true" />
                  {formFields.disclaimerText ?? "SYSTEM STATUS: READY FOR TRANSMISSION"}
                </p>
                <button suppressHydrationWarning type="submit" className="contact-inquiry__submit" disabled={status === "loading"}>
                  <span>{status === "loading" ? "SENDING..." : content.submitLabel.toUpperCase()}</span>
                  <SimpleIcon name="right-arrow" className="contact-inquiry__submit-icon" />
                </button>
              </div>
              {message ? <p className={status === "ok" ? "contact-form__ok" : "contact-form__err"}>{message}</p> : null}
            </form>
          </div>

          <aside className="contact-inquiry__content-right">
            <div className="contact-inquiry__ops-card">
              <h3>{(content.officeHeading || "Global Operations").toUpperCase()}</h3>
              <div className="contact-inquiry__details-list">
                {content.officeItems.map((item) => (
                  <article
                    key={item.title}
                    className={
                      item.lines.length <= 1
                        ? "contact-inquiry__detail-item contact-inquiry__detail-item--single"
                        : "contact-inquiry__detail-item"
                    }
                  >
                    <div className="contact-inquiry__detail-icon">
                      <SimpleIcon name={item.icon} className="contact-inquiry__detail-icon-svg" />
                    </div>
                    <div className="contact-inquiry__detail-copy">
                      <h4>{item.title}</h4>
                      {item.lines.map((line, index) => (
                        <p
                          key={`${item.title}-${line}`}
                          className={
                            index === 0
                              ? "contact-inquiry__detail-line contact-inquiry__detail-line--primary"
                              : "contact-inquiry__detail-line contact-inquiry__detail-line--secondary"
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="contact-inquiry__visual-tile" aria-hidden="true">
              <img src={mapImage} alt="" className="contact-inquiry__visual-image" />
              <span className="contact-inquiry__visual-label">{mapLabel}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
