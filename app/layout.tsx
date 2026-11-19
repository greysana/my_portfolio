import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { content } from "@/lib/content";
import { ProgressBar } from "@/components/layout/ProgressBar";
import "./globals.css";

const display = localFont({ src: "./fonts/BricolageGrotesque.woff2", variable: "--font-display", weight: "200 800", display: "swap" });
const body = localFont({ src: "./fonts/Figtree.woff2", variable: "--font-body", weight: "300 900", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: content.site.title, template: `%s | ${content.site.shortTitle}` },
  description: content.site.description,
  openGraph: { type: "website", title: content.site.title, description: content.site.description, siteName: content.site.shortTitle },
  twitter: { card: "summary", title: content.site.title, description: content.site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#13151a" },
  ],
};

// Applies a saved theme before first paint so there is no flash. Static string, no user input.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
