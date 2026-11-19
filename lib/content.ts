import "server-only";
import * as simpleIcons from "simple-icons";
import raw from "@/content/portfolio.json";
import { contentSchema, type Content } from "./schema";
import type { ProjectView, Tech } from "./types";

function load(): Content {
  const parsed = contentSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`content/portfolio.json is invalid:\n${issues}`);
  }
  return parsed.data;
}

export const content: Content = load();

type IconMap = Record<string, { path: string; hex: string } | undefined>;
const icons = simpleIcons as unknown as IconMap;

/** Very dark brand colors (Next.js, Ollama...) would vanish on a dark theme, so use the text color. */
function visibleColor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.12 ? "var(--tx)" : hex;
}

export function resolveTech(name: string): Tech {
  const entry = content.tech[name];
  const icon = entry?.icon ? icons["si" + entry.icon[0].toUpperCase() + entry.icon.slice(1)] : undefined;
  const hex = entry?.color ?? (icon ? `#${icon.hex}` : undefined);
  return { name, path: icon?.path, color: hex ? visibleColor(hex) : undefined };
}

export const resolveAll = (names: string[]) => names.map(resolveTech);

export function getProjects(): ProjectView[] {
  return content.projects.items.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    categories: p.categories,
    image: p.image,
    tags: resolveAll(p.tags),
    summary: p.summary,
    description: p.description,
    link: p.link,
    hasPage: Boolean(p.details),
  }));
}

/** Projects that have their own page, in file order. */
export const detailProjects = () => content.projects.items.filter((p) => p.details);
export const getProject = (slug: string) => content.projects.items.find((p) => p.slug === slug && p.details);
