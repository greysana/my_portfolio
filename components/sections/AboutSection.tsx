import { content, resolveTech } from "@/lib/content";
import { TechTile } from "@/components/ui/TechTag";

export function AboutSection() {
  const { about, skills } = content;
  return (
    <section id="about">
      <h2>{about.heading}</h2>
      {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
      <h2 className="gap">{about.skillsHeading}</h2>
      <div className="tiles">
        {skills.map((s) => <TechTile key={s.name} tech={resolveTech(s.name)} category={s.category} />)}
      </div>
      <h2 className="gap">{about.strengthsHeading}</h2>
      <ul className="ul">{about.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
    </section>
  );
}
