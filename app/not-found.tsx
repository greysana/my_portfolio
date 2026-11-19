import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page" style={{ margin: "auto", paddingTop: "20vh" }}>
      <h1>Page not found</h1>
      <p className="lead" style={{ margin: "12px 0 24px" }}>That page doesn’t exist or has moved.</p>
      <Link className="btn" href="/">Back to home</Link>
    </main>
  );
}
