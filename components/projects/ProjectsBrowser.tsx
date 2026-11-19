"use client";
import { useMemo, useState } from "react";
import type { ProjectView } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";

type Props = { projects: ProjectView[]; filters: string[]; variant: "cards" | "list" };

/** Filter chips (+ search in list mode). One component powers both the home grid and /projects. */
export function ProjectsBrowser({ projects, filters, variant }: Props) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (filter === "All" || p.categories.includes(filter)) &&
        (!q || [p.title, p.subtitle, ...p.tags.map((t) => t.name)].join(" ").toLowerCase().includes(q))
    );
  }, [projects, filter, query]);

  const chips = (
    <div className="filters" role="group" aria-label="Filter by type">
      {["All", ...filters].map((f) => (
        <button key={f} type="button" className="chip" aria-pressed={f === filter} onClick={() => setFilter(f)}>
          {f}
        </button>
      ))}
    </div>
  );

  if (variant === "cards") {
    return (
      <>
        {chips}
        <div className="grid">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ctl">
        <input className="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or technology" aria-label="Search projects" />
        {chips}
      </div>
      <div className="th" aria-hidden="true">
        <span>Project</span><span>Type</span><span>Built with</span><span>Details</span>
      </div>
      <ul className="tbl">
        {visible.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
      {visible.length === 0 && <p className="none" role="status">No projects match your search. Clear the search or pick another type.</p>}
    </>
  );
}
