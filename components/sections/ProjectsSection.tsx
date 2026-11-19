import Link from "next/link";
import { content, getProjects } from "@/lib/content";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";

export function ProjectsSection() {
  const { projects } = content;
  return (
    <section id="projects">
      <h2>{projects.heading}</h2>
      <ProjectsBrowser variant="cards" projects={getProjects()} filters={projects.filters} />
      <p className="after-grid"><Link className="more" href="/projects">{projects.viewAllLabel}</Link></p>
    </section>
  );
}
