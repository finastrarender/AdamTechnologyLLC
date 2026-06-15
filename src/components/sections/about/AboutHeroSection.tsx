// import type { z } from "zod";
// import type { aboutHeroDataSchema } from "@/schemas/sections";

// type AboutHeroContent = z.infer<typeof aboutHeroDataSchema>;

// export default function AboutHeroSection({ content }: { content: AboutHeroContent }) {
//   return (
//     <section className="about-hero">
//       <div className="about-hero__background" aria-hidden="true">
//        {
//         content.backgroundImage&&(
//            <img
//           className="about-hero__background-image"
//           src={content.backgroundImage}
//           alt=""
//           width={1600}
//           height={900}
//           decoding="async"
//         />
//         )
//        }
//       </div>
//       <div className="about-hero__gradient" aria-hidden="true" />
//       <div className="about-hero__content section-shell">
//         <div className="about-hero__copy">
//           <h1 className="about-hero__title">{content.title}</h1>
//           <p className="about-hero__description">{content.description}</p>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import type { z } from "zod";
import type { aboutHeroDataSchema } from "@/schemas/sections";

type AboutHeroContent = z.infer<typeof aboutHeroDataSchema>;

export default function AboutHeroSection({
  content,
}: {
  content: AboutHeroContent;
}) {
  const imageSrc = content.backgroundImage || content.image || "/home/hero-bg.jpg";
  const stats = content.stats ?? [
    { value: "14+", label: "GLOBAL NODES" },
    { value: "99.99%", label: "PROTOCOL UPTIME" },
  ];

  return (
    <section className="about-hero">
      <img
        className="about-hero__background-image"
        src={imageSrc}
        alt=""
        width={1600}
        height={900}
        decoding="async"
      />
      <div className="about-hero__overlay" aria-hidden="true" />
      <div className="about-hero__content section-shell">
        <div className="about-hero__copy">
          <h1 className="about-hero__title">
            <span className="about-hero__title-accent">{content.titleAccent}</span>
            <span className="about-hero__title-main">{content.titleMain}</span>
          </h1>
          <p className="about-hero__description">{content.description}</p>
          <div className="about-hero__stats">
            {stats.slice(0, 2).map((item, index) => (
              <React.Fragment key={`${item.value}-${item.label}`}>
                {index > 0 ? <span className="about-hero__stat-divider" aria-hidden="true" /> : null}
                <div className="about-hero__stat">
                  <p className="about-hero__stat-value">{item.value}</p>
                  <p className="about-hero__stat-label">{item.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
