"use client";
import { useEffect, useState } from "react";

export function CopyEmail({ email, label }: { email: string; label: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 2600);
    return () => clearTimeout(t);
  }, [message]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email address copied");
    } catch {
      setMessage(`Copy failed. Email me at ${email}`);
    }
  }

  return (
    <>
      <button type="button" className="btn ghost" onClick={copy}>{label}</button>
      <div id="toast" role="status" aria-live="polite" className={message ? "on" : ""}>{message}</div>
    </>
  );
}
