"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
  createdAt: string;
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

export default function ContactInquiriesClient() {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadInquiries() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/v1/admin/contact-inquiries");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to load inquiries");
      setInquiries(json.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadInquiries();
  }, []);

  async function deleteInquiry(id: string, name: string) {
    const confirmed = window.confirm(`Delete inquiry from ${name}?`);
    if (!confirmed) return;

    setDeletingId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/v1/admin/contact-inquiries/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Delete failed");
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      setMessage("Inquiry deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <Link href="/admin">← Dashboard</Link>
      </nav>
      <div className="admin-card">
        <h1 style={{ marginTop: 0 }}>Contact inquiries</h1>
        <p className="admin-muted">
          Submissions from the contact page form. Delete entries once they have been handled.
        </p>

        {loading ? <p className="admin-muted">Loading inquiries…</p> : null}
        {!loading && inquiries.length === 0 ? (
          <p className="admin-muted">No contact inquiries yet.</p>
        ) : null}

        {!loading && inquiries.length > 0 ? (
          <div className="admin-inquiries-list">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className="admin-inquiry-card">
                <div className="admin-inquiry-card__head">
                  <div>
                    <h2>{inquiry.name}</h2>
                    <p className="admin-muted">{formatDate(inquiry.createdAt)}</p>
                  </div>
                  <button
                    type="button"
                    className="admin-button-secondary"
                    disabled={deletingId === inquiry.id}
                    onClick={() => void deleteInquiry(inquiry.id, inquiry.name)}
                  >
                    {deletingId === inquiry.id ? "Deleting…" : "Delete"}
                  </button>
                </div>

                <dl className="admin-inquiry-card__meta">
                  <div>
                    <dt>Email</dt>
                    <dd>{inquiry.email}</dd>
                  </div>
                  <div>
                    <dt>Company</dt>
                    <dd>{inquiry.company || "—"}</dd>
                  </div>
                  <div>
                    <dt>Interest area</dt>
                    <dd>{inquiry.inquiryType || "—"}</dd>
                  </div>
                  {inquiry.phone ? (
                    <div>
                      <dt>Phone</dt>
                      <dd>{inquiry.phone}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="admin-inquiry-card__message">
                  <h3>Project brief</h3>
                  <p>{inquiry.message}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {message ? (
          <p className={message.includes("deleted") ? "contact-form__ok" : "contact-form__err"}>
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
