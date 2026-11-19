import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailProjects, getProject } from "@/lib/content";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

type Params = { params: Promise<{ slug: string }> };

// Only projects with a "details" object get a page. Anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => detailProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [{ url: project.image.src, width: project.image.width, height: project.image.height }] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
