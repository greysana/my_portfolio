import Image from "next/image";
import Link from "next/link";
import { content, detailProjects, resolveAll } from "@/lib/content";
import { TechList } from "@/components/ui/TechTag";
import { SafeLink } from "@/components/ui/SafeLink";

type Project = (typeof content.projects.items)[number];

export function ProjectDetail({ project: p }: { project: Project }) {
  const d = p.details!;
  const all = detailProjects();
  const i = all.findIndex((x) => x.slug === p.slug);
  const prev = all[(i + all.length - 1) % all.length];
  const next = all[(i + 1) % all.length];
  const links = [...(p.link ? [{ label: "Visit project", url: p.link }] : []), ...(d.links ?? [])];

  return (
    <div className="page">
      <Link className="back" href="/projects">{content.projects.allHeading}</Link>
      <h1>{p.title}</h1>
      <p className="lead">{p.summary}</p>
      <TechList techs={resolveAll(p.tags)} />
      <Image className="dimg" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 959px) 100vw, 900px" priority />

      <div className="dgrid">
        <div>
          <h2>Overview</h2>
          <p>{d.overview}</p>
          {d.flow && (
            <>
              <h2 className="gap">How it works</h2>
              <ol className="flow">
                {d.flow.map((s) => (
                  <li key={s.title}><b>{s.title}</b><span>{s.text}</span></li>
                ))}
              </ol>
            </>
          )}
        </div>
        <div>
          <h2>What it does</h2>
          <ul className="ul">{d.features.map((f) => <li key={f}>{f}</li>)}</ul>
          {links.length > 0 && (
            <div className="row">
              {links.map((l) => <SafeLink key={l.url} className="btn ghost" href={l.url}>{l.label}</SafeLink>)}
            </div>
          )}
        </div>
      </div>

      {all.length > 1 && (
        <nav className="pn" aria-label="More projects with details">
          <Link href={`/projects/${prev.slug}`}><small>Previous project</small><b>{prev.title}</b></Link>
          <Link href={`/projects/${next.slug}`}><small>Next project</small><b>{next.title}</b></Link>
        </nav>
      )}
    </div>
  );
}
