import { content } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <main id="main">
        {children}
        <footer>{content.footer.text}</footer>
      </main>
    </div>
  );
}
