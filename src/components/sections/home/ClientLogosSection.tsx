import type { z } from "zod";
import type { clientLogosDataSchema } from "@/schemas/sections";
import { Building2, Cross, Landmark, Shield, Zap } from "lucide-react";

type LogosContent = z.infer<typeof clientLogosDataSchema>;

export default function ClientLogosSection({ content }: { content: LogosContent }) {
  void content;

  const eyebrow = "LICENSED BY DUBAI DEPARTMENT OF ECONOMY & TOURISM";
  const logos = [
    { label: "FINBANK", Icon: Landmark },
    { label: "MEDITECH", Icon: Cross },
    { label: "DXB_GOV", Icon: Building2 },
    { label: "SECURE_AE", Icon: Shield },
    { label: "ENERGY_CORE", Icon: Zap },
    { label: "FINBANK", Icon: Landmark },
  ];

  return (
    <section className="logos-section">
      <div className="logos-section__card">
        <p className="logos-section__eyebrow">{eyebrow}</p>
        <div className="logos-section__grid">
          {logos.map(({ label, Icon }, index) => (
            <p key={`${label}-${index}`} className="logos-section__logo">
              <Icon aria-hidden="true" />
              {label}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
