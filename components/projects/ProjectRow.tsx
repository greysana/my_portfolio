import Image from "next/image";
import Link from "next/link";
import type { ProjectView } from "@/lib/types";
import { TechList } from "@/components/ui/TechTag";

/** One line in the All Projects list. */
export function ProjectRow({ project: p }: { project: ProjectView }) {
  return (
    <li className={`tr${p.hasPage ? " lk" : ""}`}>
      <div className="pj">
        <Image src={p.image.src} alt="" width={72} height={46} sizes="72px" />
        <div>
          <b>{p.title}</b>
          <small>{p.summary}</small>
        </div>
      </div>
      <span className="ty">{p.categories.join(", ")}</span>
      <TechList techs={p.tags} />
      <span className="pgc">
        {p.hasPage ? <Link className="more stretch" href={`/projects/${p.slug}`}>View details</Link> : <span className="ty">No details page</span>}
      </span>
    </li>
  );
}
