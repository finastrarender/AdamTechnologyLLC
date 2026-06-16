import LoginForm from "@/components/admin/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function AdminLoginPage() {
  return (
    <div className="admin-shell" style={{ display: "grid", placeItems: "center" }}>
      <div className="admin-card" style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ marginTop: 0 }}>Admin sign in</h1>
        <p className="admin-muted">Credentials for the CMS.</p>
        <LoginForm />
      </div>
    </div>
  );
}
