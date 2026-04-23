import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Free HTML5 Games — Play Online Without Flash or Download",
  description:
    "Play the best free HTML5 games online — no Flash, no download, no install. Works on any device, any browser, instantly.",
  keywords: [
    "html5 games",
    "html5 games free online",
    "html5 browser games",
    "play html5 games",
    "best html5 games 2025",
    "html5 games no flash",
    "free html5 games",
    "html5 games online",
    "browser html5 games",
    "html5 mobile games",
  ],
};

export default function Html5GamesPage() {
  const all = getAllGames();

  // Featured subset: top-rated games, limit 24
  const featured = [...all]
    .filter((g) => g.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 24);

  // All games for the full grid
  const allSorted = [...all].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            No Flash Required
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Free HTML5 Games Online
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Play <strong className="text-white">free HTML5 games</strong> directly in your browser —
            no Flash, no download, no plugin of any kind. Every game on FreePlayArena uses modern
            HTML5 and JavaScript, so they work instantly on any device: desktop, laptop, tablet,
            or phone.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "🖥️ PC & Mac", href: "/no-download-games" },
              { label: "📱 Mobile", href: "/games" },
              { label: "💻 Chromebook", href: "/school-games" },
              { label: "🧩 Puzzle", href: "/puzzle-games" },
              { label: "🎯 Action", href: "/category/action" },
              { label: "🎲 Casual", href: "/category/casual" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white/10 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why HTML5 — 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "⚡",
            title: "No Flash, No Plugin",
            body: "Flash was discontinued in 2020. HTML5 games replace it entirely — they use the same technology as modern websites and need no special plugin to run.",
          },
          {
            icon: "📱",
            title: "Works on Any Device",
            body: "HTML5 runs in every modern browser — Chrome, Firefox, Safari, Edge — on any operating system. The same game works on your PC and your phone.",
          },
          {
            icon: "🚀",
            title: "Instant Load, Zero Install",
            body: "No executables, no app stores, no admin permissions. HTML5 games stream directly from our server and are ready to play in seconds.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-2">{icon}</div>
            <h2 className="text-white font-semibold mb-1">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot slot="html5-games-top" className="w-full" />

      {/* Featured HTML5 Games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            ⭐ Featured HTML5 Games ({featured.length})
          </h2>
          <Link href="/games" className="text-blue-400 hover:text-blue-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={featured} priorityCount={8} />
      </section>

      <AdSlot slot="html5-games-mid" className="w-full" />

      {/* All HTML5 games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🎮 All HTML5 Games ({allSorted.length}+)
          </h2>
        </div>
        <GameGrid games={allSorted} priorityCount={0} />
      </section>

      {/* SEO content block */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">What Are HTML5 Games?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          HTML5 games are browser-based games built with modern web technologies — HTML5, CSS3, and
          JavaScript. They replaced Adobe Flash games after Flash was officially discontinued by Adobe
          on December 31, 2020. Unlike Flash, HTML5 is a native web standard supported by every
          modern browser without any plugin installation.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At <strong className="text-white">FreePlayArena</strong>, every single game in our library
          is an HTML5 game. This was a deliberate choice — we wanted games that work everywhere,
          on every device, without barriers. Whether you're on a Windows gaming PC, a Mac, an
          Android phone, an iPhone, or a school Chromebook, our games load and play identically.
        </p>

        <h2 className="text-white font-bold text-lg">HTML5 vs Flash — What Changed?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Flash games dominated the web from roughly 2000 to 2015. They required the Adobe Flash
          Player plugin, which browsers eventually blocked by default due to security vulnerabilities.
          HTML5 games need nothing extra — your browser already supports them. The transition has
          been largely positive: HTML5 games are more secure, more accessible, load faster, and
          work on mobile devices that Flash never supported.
        </p>

        <h2 className="text-white font-bold text-lg">Do HTML5 Games Work on Mobile?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Yes. HTML5 was designed with mobile in mind. Many of our games include touch controls
          specifically for phones and tablets. Games like casual puzzles and clickers work
          especially well on touch screens. No app download from the App Store or Google Play
          is required — just open your mobile browser and play.
        </p>

        {/* Cross-links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🚫 Ad-Free Games", href: "/ad-free-games" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "🏫 School Games", href: "/school-games" },
            { label: "⚡ No Download", href: "/no-download-games" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
        {[
          {
            q: "What is an HTML5 game?",
            a: "An HTML5 game is a browser-based game built with HTML5, CSS, and JavaScript. It runs entirely inside your web browser without needing Flash, Unity, or any other plugin.",
          },
          {
            q: "Do HTML5 games work on mobile?",
            a: "Yes. HTML5 is fully supported on iOS Safari and Android Chrome. Many of our games include touch controls. No app download is required — just open your mobile browser.",
          },
          {
            q: "Why did HTML5 replace Flash?",
            a: "Adobe Flash was discontinued in December 2020 due to widespread security vulnerabilities. HTML5 is a native web standard that's secure, fast, and works on mobile — none of which Flash could fully deliver.",
          },
          {
            q: "Are these HTML5 games free?",
            a: "Yes, completely free. No purchase, no premium tier, no in-game payments. The site is ad-supported which keeps every HTML5 game free to play.",
          },
        ].map(({ q, a }) => (
          <div key={q} className="bg-[#1a1a2e] rounded-xl p-5">
            <h3 className="text-white font-semibold mb-2 text-sm">{q}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
