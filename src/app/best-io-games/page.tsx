import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { CollectionPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Best .io Games Free Online — Browser IO Games No Download",
  description:
    "Play the best free .io games online — no download, no sign-up. Slither-style, battle royale, and competitive browser IO games. Fast-loading HTML5 games you can play right now.",
  keywords: [
    "io games",
    "best io games",
    "io games free online",
    ".io games",
    "browser io games",
    "io games no download",
    "slither io",
    "agar io games",
    "best browser io games",
    "free io games online",
  ],
  alternates: { canonical: "https://freeplayarena.com/best-io-games" },
  openGraph: {
    title: "Best .io Games Free Online — No Download",
    description:
      "Play the best free .io browser games — competitive, fast-loading, no download or sign-up needed.",
    url: "https://freeplayarena.com/best-io-games",
    type: "website",
  },
};

const IO_SLUGS = [
  "snake-advanced",
  "wordle-plus",
  "2048-classic",
  "minesweeper-pro",
  "tetris-classic",
  "blockrain-tetris",
  "connect-four-kenrick",
  "reversi-ogeon",
  "sokoban-omerkel",
  "sliding-tiles-puzzle",
  "lights-out",
  "sudoku-classic",
  "sudoku-timer",
  "solitairey",
  "mahjong-solitaire-mah",
  "pong-browser",
];

const IO_STYLE_SLUGS = [
  "neonroll",
  "fishy-feast",
  "big-rolling-ball",
  "spike-rush",
  "bullet-man-master-3d",
  "hydrasword",
  "noobs-crazy-combo",
  "skyfury",
];

export default function BestIoGamesPage() {
  const allGames = getAllGames();

  const ioGames = IO_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const ioStyleGames = IO_STYLE_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const allShown = new Set([...IO_SLUGS, ...IO_STYLE_SLUGS]);

  const fillGames = allGames
    .filter(
      (g) =>
        !allShown.has(g.slug) &&
        g.tags?.some((t) => [".io", "io game", "onlinegames", "online", "browser"].some((k) => t.includes(k)))
    )
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 20);

  const topRated = allGames
    .filter((g) => !allShown.has(g.slug) && !fillGames.find((x) => x.slug === g.slug))
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 16);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CollectionPageSchema
        name="Best .io Games Online"
        description="The best free .io-style browser games. Snake, competitive puzzles, no download."
        url="/best-io-games"
        games={ioGames}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "IO Games", url: "/best-io-games" },
        ]}
      />
      {/* Hero */}
      <div className="bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border border-cyan-500/20 rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Play Instantly in Browser
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Best .io Games Online
        </h1>
        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
          The best <strong className="text-white">free .io games</strong> and competitive browser
          games — no download, no account, no plugins. From Slither-style snake games to battle
          puzzle arenas, these are the most-played browser games you can start immediately.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "🐍 Snake Style", href: "/games/snake-advanced" },
            { label: "🧩 Puzzle IO", href: "/category/puzzle" },
            { label: "⚔️ Battle Games", href: "/category/action" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-white/10 hover:bg-cyan-600 text-white text-sm rounded-lg transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* What are io games */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "⚡",
            title: "Instant Play",
            body: ".io games are famous for loading instantly with no install. Just open the URL and you're playing within seconds.",
          },
          {
            icon: "🌐",
            title: "Browser Native",
            body: "All .io-style games here run natively in HTML5 — no Flash, no Unity download, no Java. Any modern browser works.",
          },
          {
            icon: "🏆",
            title: "Competitive",
            body: "IO games are built around competition — survival, territory, or score-chasing. Simple mechanics with deep skill ceilings.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-2">{icon}</div>
            <h2 className="text-white font-semibold mb-1">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot format="banner" className="w-full" />

      {/* Classic IO-style games */}
      <section>
        <h2 className="text-white font-bold text-xl mb-2">
          🎮 Classic .io-Style Games
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          These games capture the essence of .io games — simple rules, endless replayability, instant start.
        </p>
        <GameGrid games={ioGames} priorityCount={8} />
      </section>

      {/* Action io-style */}
      <section>
        <h2 className="text-white font-bold text-xl mb-2">
          ⚔️ Competitive Browser Games
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          Fast-paced competitive games with the addictive "one more round" feel of the best .io titles.
        </p>
        <GameGrid games={ioStyleGames} priorityCount={8} />
      </section>

      {fillGames.length > 0 && (
        <section>
          <h2 className="text-white font-bold text-xl mb-5">🌐 More Online Games</h2>
          <GameGrid games={fillGames} priorityCount={4} />
        </section>
      )}

      <section>
        <h2 className="text-white font-bold text-xl mb-5">🔥 Most Played Games</h2>
        <GameGrid games={topRated} priorityCount={4} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5 max-w-3xl">
        <h2 className="text-white font-bold text-xl">What Are .io Games?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          ".io games" originally referred to games hosted on .io domains — a top-level domain
          originally assigned to the British Indian Ocean Territory but popularized by tech
          companies and game developers. The term now broadly refers to a genre of browser games
          characterized by simple mechanics, competitive multiplayer, and instant accessibility.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          The genre exploded in popularity with games like Agar.io (2015) and Slither.io (2016).
          These games proved that massively multiplayer browser experiences could be built without
          plugins or downloads. Today, hundreds of .io-style games exist, ranging from simple
          survival games to complex strategy arenas.
        </p>

        <h3 className="text-white font-semibold text-lg">Best .io Games to Play Right Now</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          On FreePlayArena, you'll find the best .io-style browser games organized by type.
          Snake-style games like our{" "}
          <Link href="/games/snake-advanced" className="text-violet-400 hover:text-violet-300">Snake Advanced</Link>{" "}
          deliver the classic territory-eating experience that made{" "}
          Slither.io famous. Puzzle io games like{" "}
          <Link href="/games/2048-classic" className="text-violet-400 hover:text-violet-300">2048</Link>{" "}
          and <Link href="/games/tetris-classic" className="text-violet-400 hover:text-violet-300">Tetris</Link>{" "}
          offer infinite replayability with high-score chasing that keeps you coming back.
        </p>

        <h3 className="text-white font-semibold text-lg">Are .io Games Free?</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Yes — virtually all .io games are free to play. The games on FreePlayArena are free
          with no account required. Many are also ad-free, particularly our open-source classics.
          Check our{" "}
          <Link href="/ad-free-games" className="text-violet-400 hover:text-violet-300">Ad Free Games</Link>{" "}
          page for games with zero in-game advertising.
        </p>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="text-white font-semibold">FAQ — .io Games</h3>
          {[
            {
              q: "What's the most popular .io game?",
              a: "Agar.io and Slither.io are the most historically popular .io games. For single-player browser games in the .io style, Snake and 2048 remain among the most-played titles worldwide.",
            },
            {
              q: "Do .io games work on school Chromebooks?",
              a: "Yes. All games here are pure HTML5 and run on any Chromebook with Chrome browser. No extensions or special permissions required.",
            },
            {
              q: "Can I play .io games on my phone?",
              a: "Yes. All games on this page are mobile-compatible and work in mobile browsers without any app download.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h4 className="text-white font-semibold text-sm mb-1">{q}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section>
        <h2 className="text-white font-semibold mb-4">More Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🎮 Action Games", href: "/category/action" },
            { label: "🏆 Competitive", href: "/category/sports" },
            { label: "✓ Ad Free", href: "/ad-free-games" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="py-3 px-4 bg-[#1a1a2e] hover:bg-[#22223b] border border-white/10 text-gray-300 hover:text-white text-sm rounded-xl transition-all text-center">
              {label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
