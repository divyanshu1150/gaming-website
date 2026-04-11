import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FreePlayArena — Play Free Online Games",
    template: "%s | FreePlayArena",
  },
  description:
    "Play hundreds of free online games instantly at FreePlayArena — no download required. Action, puzzle, racing, sports, adventure and more.",
  keywords: ["free online games", "play games online", "browser games", "no download games", "html5 games"],
  openGraph: {
    siteName: "FreePlayArena",
    type: "website",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@freeplayarena",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
