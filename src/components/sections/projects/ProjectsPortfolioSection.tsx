import type { z } from "zod";
import type { projectsPortfolioDataSchema } from "@/schemas/sections";
import { DEFAULT_PROJECTS_PORTFOLIO } from "@/data/projects-reference";

type ProjectsPortfolioContent = z.infer<typeof projectsPortfolioDataSchema>;

export default function ProjectsPortfolioSection({
  content,
}: {
  content: ProjectsPortfolioContent;
}) {
  const items =
    Array.isArray(content.items) && content.items.length > 0
      ? content.items
      : DEFAULT_PROJECTS_PORTFOLIO.items;

  return (
    <section className="projects-portfolio">
      <div className="section-shell projects-portfolio__shell">
        {items.map((item, index) => {
          const reverse = item.reverse ?? index % 2 === 1;
          const challengeLabel = item.challengeLabel ?? "The Challenge";
          const solutionLabel = item.solutionLabel ?? "The Solution";

          return (
            <article
              key={`${item.title}-${index}`}
              className={`projects-portfolio__card${reverse ? " projects-portfolio__card--reverse" : ""}`}
            >
              <div className="projects-portfolio__image">
                <span className="projects-portfolio__badge">{item.badge}</span>
                <img src={item.image} alt="" />
              </div>
              <div className="projects-portfolio__content">
                <h3>{item.title}</h3>
                <div className="projects-portfolio__details">
                  <div className="projects-portfolio__col">
                    <h4>{challengeLabel}</h4>
                    <p>{item.challenge}</p>
                  </div>
                  <div className="projects-portfolio__col">
                    <h4>{solutionLabel}</h4>
                    <p>{item.solution}</p>
                  </div>
                </div>
                <div className="projects-portfolio__footer">
                  <div className="projects-portfolio__metrics">
                    {item.metrics.map((metric, metricIndex) => (
                      <div key={`${metric.label}-${metricIndex}`} className="projects-portfolio__metric-group">
                        {metricIndex > 0 ? (
                          <span className="projects-portfolio__metric-divider" aria-hidden="true" />
                        ) : null}
                        <div className="projects-portfolio__metric">
                          <span className="projects-portfolio__metric-value">{metric.value}</span>
                          <span className="projects-portfolio__metric-label">{metric.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
