import { content, resolveAll } from "@/lib/content";
import { resumeAvailable } from "@/lib/resume";
import { TechList } from "@/components/ui/TechTag";
import { SafeLink } from "@/components/ui/SafeLink";
import { SidebarNav } from "./SidebarNav";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  const { profile, about, experience, projects } = content;
  const items = [
    { id: "about", label: about.heading },
    { id: "experience", label: experience.heading },
    { id: "projects", label: projects.heading },
    { id: "contact", label: "Contact" },
  ];

  return (
    <aside>
      <div className="intro">
        <div className="mono" aria-hidden="true">{profile.initials}</div>
        <p className="site-name">{profile.name}</p>
        <p className="role">{profile.role}</p>
        <p className="blurb">{profile.summary}</p>
        <TechList techs={resolveAll(profile.stackHighlights)} />
      </div>
      <SidebarNav items={items} />
      <div className="sfoot">
        {/* Only shown when private/resume.pdf exists, so visitors never hit a dead link. */}
        {resumeAvailable() && (
          <div className="row">
            <a className="btn" href="/api/resume" download>{profile.resumeLabel}</a>
          </div>
        )}
        <div className="soc">
          {profile.links.map((l) => (
            <SafeLink key={l.label} href={l.url}>{l.label}</SafeLink>
          ))}
        </div>
        {profile.availability.open && (
          <div className="live"><i />{profile.availability.label}</div>
        )}
        <ThemeToggle />
      </div>
    </aside>
  );
}
