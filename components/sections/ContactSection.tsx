import { content } from "@/lib/content";
import { CopyEmail } from "@/components/ui/CopyEmail";

export function ContactSection() {
  const { contact, profile } = content;
  return (
    <section id="contact">
      <div className="cta">
        <h2 style={{ marginBottom: 10 }}>{contact.heading}</h2>
        <p>{contact.body}</p>
        <div className="row">
          <a className="btn" href={`mailto:${profile.email}`}>{contact.emailLabel}</a>
          <CopyEmail email={profile.email} label={contact.copyLabel} />
        </div>
      </div>
    </section>
  );
}
