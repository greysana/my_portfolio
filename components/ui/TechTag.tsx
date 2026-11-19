import type { CSSProperties } from "react";
import type { Tech } from "@/lib/types";

const colorVar = (t: Tech) => (t.color ? ({ "--bc": t.color } as CSSProperties) : undefined);

export function TechIcon({ tech }: { tech: Tech }) {
  if (!tech.path) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={tech.path} />
    </svg>
  );
}

/** Small colored pill: brand icon + name. */
export function TechTag({ tech }: { tech: Tech }) {
  return (
    <span className="chip tk" style={colorVar(tech)}>
      <TechIcon tech={tech} />
      {tech.name}
    </span>
  );
}

export function TechList({ techs, className = "" }: { techs: Tech[]; className?: string }) {
  return (
    <div className={`chips ${className}`.trim()}>
      {techs.map((t) => (
        <TechTag key={t.name} tech={t} />
      ))}
    </div>
  );
}

/** Larger tile used in the skills grid. */
export function TechTile({ tech, category }: { tech: Tech; category: string }) {
  return (
    <div className="tile" style={colorVar(tech)}>
      <TechIcon tech={tech} />
      <span>
        <b>{tech.name}</b>
        <small>{category}</small>
      </span>
    </div>
  );
}
