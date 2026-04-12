import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  other: {
    "google-adsense-account": "ca-pub-9318459431952179",
  },
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
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FreePlayArena — Play Free Online Games",
      },
    ],
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
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
