import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames, getFeaturedGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Free Games No Download — Play Online Instantly in Browser",
  description:
    "Play 300+ free online games with no download required. All HTML5 browser games — works on PC, Mac, tablet and mobile. No install, no sign-up.",
  keywords: [
    "free games no download",
    "online games no download",
    "games without downloading",
    "play games online no download",
    "browser games no download",
    "instant play games",
    "no install games",
    "html5 games online",
    "games that dont need download",
    "free online games without downloading",
  ],
};

export default function NoDownloadGamesPage() {
  const all = getAllGames();
  const featured = getFeaturedGames(8);
  const popular = [...all].sort((a,b) => b.plays - a.plays).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      <div className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          ⚡ Instant Play — Zero Downloads
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Free Online Games — No Download Required
        </h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mb-6">
          Every game on FreePlayArena plays directly in your browser. No downloads, no installs,
          no plugins. Just click and play — on Windows, Mac, iPhone, Android, or Chromebook.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "✅ No Download", desc: "100% browser-based" },
            { label: "✅ No Sign-Up", desc: "Zero accounts needed" },
            { label: "✅ No Cost", desc: "Completely free" },
            { label: "✅ Any Device", desc: "Mobile & desktop" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex flex-col bg-white/10 rounded-lg px-4 py-2">
              <span className="text-white text-sm font-semibold">{label}</span>
              <span className="text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <AdSlot format="banner" className="w-full" />

      <section>
        <h2 className="text-white font-bold text-xl mb-5">⭐ Featured Games</h2>
        <GameGrid games={featured} priorityCount={8} />
      </section>

      <section>
        <h2 className="text-white font-bold text-xl mb-5">🔥 Most Played</h2>
        <GameGrid games={popular} priorityCount={0} />
      </section>

      <section>
        <h2 className="text-white font-bold text-xl mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}
              className="flex items-center gap-3 p-4 bg-[#1a1a2e] hover:bg-[#22223b] rounded-xl transition-colors group">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <div className="text-white font-semibold text-sm group-hover:text-violet-400">{cat.name}</div>
                <div className="text-gray-500 text-xs">{cat.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot format="banner" className="w-full" />

      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-4 max-w-3xl">
        <h2 className="text-white font-bold text-xl">Why No-Download Games?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Traditional PC games require gigabytes of downloads, installation processes, and
          often admin permissions. Browser games eliminate all of that. Modern HTML5 technology
          allows full gaming experiences — from puzzle and strategy games to action and adventure —
          to run entirely within a browser tab.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At FreePlayArena, every one of our {all.length}+ games is HTML5-based. This means
          they load in seconds, work on any operating system, and require absolutely no
          installation. You can play on your work computer, school Chromebook, or phone
          without installing anything.
        </p>
        <h3 className="text-white font-semibold">How it works:</h3>
        <ol className="space-y-2 text-gray-400 text-sm list-none">
          {[
            "Open freeplayarena.com in any modern browser",
            "Browse or search for a game you like",
            "Click the game — it starts loading immediately",
            "Click the Play button and start playing",
          ].map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="w-6 h-6 flex-shrink-0 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{i+1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-white font-bold text-xl">FAQ</h2>
        {[
          { q: "Do I need to install anything to play?", a: "No. All games run in your browser using HTML5. No Flash, no Unity downloads, no plugins of any kind." },
          { q: "Do the games work on mobile?", a: "Yes. All games are mobile-compatible and work on iOS Safari and Android Chrome without any app install." },
          { q: "Are the games really free?", a: "100% free. No in-app purchases, no premium tiers, no paywalls. The site is ad-supported which keeps all games free." },
          { q: "Can I play offline?", a: "No — games are streamed from our servers and require an internet connection. However, they work on slow connections since the files are small." },
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
