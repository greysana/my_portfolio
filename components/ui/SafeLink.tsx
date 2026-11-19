import type { AnchorHTMLAttributes } from "react";

/** Plain anchor that adds noopener/noreferrer automatically for external http(s) links. */
export function SafeLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = /^https?:\/\//i.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
