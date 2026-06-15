import type { z } from "zod";
import type { projectsCapabilitiesDataSchema } from "@/schemas/sections";
import { DEFAULT_PROJECTS_CAPABILITIES } from "@/data/projects-reference";
import { ProjectCapabilityIcon } from "@/components/projects/ProjectCapabilityIcon";

type ProjectsCapabilitiesContent = z.infer<typeof projectsCapabilitiesDataSchema>;

export default function ProjectsCapabilitiesSection({
  content,
}: {
  content: ProjectsCapabilitiesContent;
}) {
  const title = content.title?.trim() || DEFAULT_PROJECTS_CAPABILITIES.title;
  const items =
    Array.isArray(content.items) && content.items.length > 0
      ? content.items
      : DEFAULT_PROJECTS_CAPABILITIES.items;

  return (
    <section className="projects-capabilities">
      <div className="section-shell">
        <h2 className="projects-capabilities__title">{title}</h2>
        <div className="projects-capabilities__rule" aria-hidden="true" />
        <div className="projects-capabilities__grid">
          {items.map((item) => (
            <article key={item.title} className="projects-capabilities__item">
              <div className="projects-capabilities__icon">
                <ProjectCapabilityIcon kind={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
