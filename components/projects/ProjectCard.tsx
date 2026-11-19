"use client";
import { useId, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectView } from "@/lib/types";
import { TechList } from "@/components/ui/TechTag";

export function ProjectCard({ project: p }: { project: ProjectView }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  // Cursor-follow highlight (pure CSS variables, no re-render).
  function track(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article className="card" onPointerMove={track}>
      <div className="shot">
        <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 959px) 100vw, 420px" />
      </div>
      <div className="cb">
        <h3>{p.title}</h3>
        <p className="sub">{p.subtitle}</p>
        <p>{p.summary}</p>
        <TechList techs={p.tags} />
        {p.hasPage ? (
          <Link className="more stretch" href={`/projects/${p.slug}`}>View details</Link>
        ) : (
          p.description && (
            <>
              <button type="button" className="more" aria-expanded={open} aria-controls={regionId} onClick={() => setOpen((o) => !o)}>
                {open ? "Show less" : "Read more"}
              </button>
              <div className={`acc${open ? " in" : ""}`} id={regionId} role="region" inert={!open}>
                <div><p className="full">{p.description}</p></div>
              </div>
            </>
          )
        )}
      </div>
    </article>
  );
}
