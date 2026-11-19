import { content, resolveAll } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { TechList } from "@/components/ui/TechTag";

export function ExperienceSection() {
  const { experience } = content;
  return (
    <section id="experience">
      <h2>{experience.heading}</h2>
      {experience.items.map((e) => (
        <Accordion
          key={`${e.role}-${e.period}`}
          defaultOpen={e.defaultOpen}
          header={
            <span>
              <span className="t">{e.role}</span>
              <small><span className="co">{e.company}</span> · {e.period}</small>
            </span>
          }
        >
          <p>{e.summary}</p>
          <ul className="ul">{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <TechList className="pad-b" techs={resolveAll(e.tags)} />
        </Accordion>
      ))}
    </section>
  );
}
