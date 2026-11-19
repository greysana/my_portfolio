"use client";
import { useId, useState, type ReactNode } from "react";

export function Accordion({ header, children, defaultOpen = false }: { header: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`exp${open ? " open" : ""}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {header}
        <span className="pm" aria-hidden="true" />
      </button>
      <div className="acc" id={id} role="region" inert={!open}>
        <div>{children}</div>
      </div>
    </div>
  );
}
