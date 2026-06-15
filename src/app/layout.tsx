import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: {
    default: "Adam Technology L.L.C.",
    template: "%s | Adam Technology L.L.C.",
  },
  description:
    "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
  metadataBase: new URL(process.env.AUTH_URL ?? "http://localhost:3000"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* suppressHydrationWarning on html/body: browser extensions often inject attrs (e.g. cz-shortcut-listen). */
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="owtc-app" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
