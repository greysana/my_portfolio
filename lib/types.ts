/** A technology with its icon + brand color already resolved on the server. */
export type Tech = { name: string; path?: string; color?: string };

export type ProjectView = {
  slug: string;
  title: string;
  subtitle: string;
  categories: string[];
  image: { src: string; alt: string; width: number; height: number };
  tags: Tech[];
  summary: string;
  description?: string;
  link?: string;
  hasPage: boolean;
};
