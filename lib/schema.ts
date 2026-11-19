import { z } from "zod";

/** Only http(s), mailto, or a site-relative path. Blocks `javascript:` and friends if the JSON is ever edited wrongly. */
const safeUrl = z
  .string()
  .refine(
    (v) => /^(https?:\/\/|mailto:)/i.test(v) || /^\/(?!\/)/.test(v),
    "must start with http(s)://, mailto:, or a single /"
  );

const text = z.string().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use lowercase letters, numbers and dashes");

const image = z.object({
  src: z.string().regex(/^\/images\/[\w./-]+$/, "images must live in /public/images"),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const link = z.object({ label: text, url: safeUrl });

const details = z.object({
  overview: text,
  features: z.array(text).min(1),
  flow: z.array(z.object({ title: text, text })).optional(),
  links: z.array(link).optional(),
});

const project = z
  .object({
    slug,
    title: text,
    subtitle: text,
    categories: z.array(text).min(1),
    image,
    tags: z.array(text),
    summary: text,
    /** Shown in an expandable block when the project has no details page. */
    description: text.optional(),
    link: safeUrl.optional(),
    /** Adding this object gives the project its own page at /projects/<slug>. */
    details: details.optional(),
  })
  .refine((p) => p.description || p.details, {
    message: "needs either a \"description\" or a \"details\" object",
  });

export const contentSchema = z
  .object({
    _readme: z.string().optional(),
    site: z.object({ title: text, shortTitle: text, description: text }),
    profile: z.object({
      name: text,
      initials: text.max(3),
      role: text,
      summary: text,
      stackHighlights: z.array(text),
      availability: z.object({ open: z.boolean(), label: text }),
      resumeLabel: text,
      email: z.string().email(),
      links: z.array(link),
    }),
    about: z.object({
      heading: text,
      paragraphs: z.array(text).min(1),
      skillsHeading: text,
      strengthsHeading: text,
      strengths: z.array(text),
    }),
    skills: z.array(z.object({ name: text, category: text })),
    tech: z.record(z.string(), z.object({ icon: text.optional(), color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional() })),
    experience: z.object({
      heading: text,
      items: z.array(
        z.object({
          role: text,
          company: text,
          period: text,
          summary: text,
          highlights: z.array(text),
          tags: z.array(text),
          defaultOpen: z.boolean().optional(),
        })
      ),
    }),
    projects: z.object({
      heading: text,
      allHeading: text,
      allIntro: text,
      viewAllLabel: text,
      filters: z.array(text),
      items: z.array(project).min(1),
    }),
    contact: z.object({ heading: text, body: text, emailLabel: text, copyLabel: text }),
    footer: z.object({ text }),
  })
  .superRefine((c, ctx) => {
    const seen = new Set<string>();
    c.projects.items.forEach((p, i) => {
      if (seen.has(p.slug)) ctx.addIssue({ code: "custom", path: ["projects", "items", i, "slug"], message: `duplicate slug "${p.slug}"` });
      seen.add(p.slug);
    });
  });

export type Content = z.infer<typeof contentSchema>;
