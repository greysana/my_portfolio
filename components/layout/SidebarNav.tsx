"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { id: string; label: string };

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState(items[0]?.id);

  // Scroll-spy only on the home page, where the sections exist.
  useEffect(() => {
    if (pathname !== "/") return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-35% 0px -60% 0px",
    });
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname, items]);

  const current = pathname === "/" ? active : pathname.startsWith("/projects") ? "projects" : "";

  return (
    <nav className="nav" aria-label="Sections">
      {items.map((i) => (
        <Link key={i.id} href={`/#${i.id}`} className={current === i.id ? "on" : ""} aria-current={current === i.id ? "true" : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
