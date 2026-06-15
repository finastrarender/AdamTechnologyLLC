import Link from "next/link";
import type { z } from "zod";
import type { projectsHeroDataSchema } from "@/schemas/sections";
import { DEFAULT_PROJECTS_HERO } from "@/data/projects-reference";

type ProjectsHeroContent = z.infer<typeof projectsHeroDataSchema>;

export default function ProjectsHeroSection({ content }: { content: ProjectsHeroContent }) {
  const titleLines =
    content.titleLines?.length > 0 ? content.titleLines : DEFAULT_PROJECTS_HERO.titleLines;
  const description = content.description?.trim() || DEFAULT_PROJECTS_HERO.description;
  const action = content.action ?? DEFAULT_PROJECTS_HERO.action;
  const backgroundImage = content.backgroundImage?.trim() || DEFAULT_PROJECTS_HERO.backgroundImage;

  return (
    <section
      className="projects-hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="projects-hero__overlay" aria-hidden="true" />
      <div className="section-shell projects-hero__content">
        <h1 className="projects-hero__title">
          {titleLines.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </h1>
        <p className="projects-hero__description">{description}</p>
        <Link href={action.href} className="projects-hero__button">
          {action.label}
        </Link>
      </div>
    </section>
  );
}
