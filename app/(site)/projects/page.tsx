import type { Metadata } from "next";
import Link from "next/link";
import { content, getProjects } from "@/lib/content";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";

export const metadata: Metadata = { title: content.projects.allHeading, description: content.projects.allIntro };

export default function AllProjectsPage() {
  const { projects } = content;
  return (
    <div className="page wide">
      <Link className="back" href="/">Back to home</Link>
      <h1>{projects.allHeading}</h1>
      <p className="lead">{projects.allIntro}</p>
      <ProjectsBrowser variant="list" projects={getProjects()} filters={projects.filters} />
    </div>
  );
}
