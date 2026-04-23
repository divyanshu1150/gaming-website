import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Classic Games Online Free — Play Retro Arcade Games",
  description:
    "Play free classic games online — Snake, Tetris, Pong, Minesweeper, Sudoku and more. Timeless arcade and puzzle games, no download, instantly in your browser.",
  keywords: [
    "classic games online free",
    "retro games online",
    "classic arcade games free",
    "old school games online",
    "snake game online",
    "tetris online free",
    "classic browser games",
    "retro arcade games free",
    "old school games browser",
    "classic puzzle games free",
  ],
};

const CLASSIC_SLUGS = [
  "snake",
  "breakout",
  "pong",
  "tetris",
  "minesweeper",
  "sudoku",
  "2048",
  "memory-match",
  "tic-tac-toe",
];

export default function ClassicGamesPage() {
  const all = getAllGames();

  // Games tagged "classic" OR that match the classic slugs list
  const classicSlugSet = new Set(CLASSIC_SLUGS);
  const classicGames = all.filter(
    (g) => g.tags.includes("classic") || classicSlugSet.has(g.slug)
  );

  // Deduplicate while preserving order (slugs first, then tagged)
  const seen = new Set<string>();
  const deduped = classicGames.filter((g) => {
    if (seen.has(g.slug)) return false;
    seen.add(g.slug);
    return true;
  });

  // Arcade classics: "arcade" tag overlap
  const arcadeClassics = deduped
    .filter((g) => g.tags.includes("arcade"))
    .slice(0, 8);

  // Puzzle classics
  const puzzleClassics = deduped
    .filter((g) => g.category === "puzzle" || g.tags.includes("puzzle"))
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-900/70 to-violet-900/60 border border-purple-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Timeless Classics
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Classic Games Online — Free Retro Arcade
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Relive the golden age of gaming with{" "}
            <strong className="text-white">free classic games</strong> reimagined in HTML5.
            Snake, Breakout, Pong, Minesweeper, Sudoku, 2048 — all the timeless favorites,
            playable instantly in your browser. No download, no nostalgia plugin required.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "🐍 Snake", href: "/games/snake" },
              { label: "🧱 Breakout", href: "/games/breakout" },
              { label: "🏓 Pong", href: "/games/pong" },
              { label: "💣 Minesweeper", href: "/games/minesweeper" },
              { label: "🔢 2048", href: "/games/2048" },
              { label: "🃏 Memory Match", href: "/games/memory-match" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white/10 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🕹️",
            title: "Timeless Gameplay",
            body: "Classic games are classics for a reason — simple rules, deep challenge, infinite replayability. These designs have stood the test of decades.",
          },
          {
            icon: "✨",
            title: "HTML5 Reimagined",
            body: "Every classic has been rebuilt from scratch in HTML5. Crisp visuals, smooth performance, and modern touch controls — same soul, better engine.",
          },
          {
            icon: "⚡",
            title: "Instant in Browser",
            body: "No ROM files, no emulators, no setup. Click any classic and it loads instantly in your browser tab on any device.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-2">{icon}</div>
            <h2 className="text-white font-semibold mb-1">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot slot="classic-games-top" className="w-full" />

      {/* All Classic Games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🕹️ Classic Games ({deduped.length})
          </h2>
          <Link href="/games" className="text-purple-400 hover:text-purple-300 text-sm">
            View all games →
          </Link>
        </div>
        <GameGrid games={deduped} priorityCount={8} />
      </section>

      <AdSlot slot="classic-games-mid" className="w-full" />

      {/* Arcade Classics subsection */}
      {arcadeClassics.length > 0 && (
        <section>
          <h2 className="text-white font-bold text-xl mb-5">
            👾 Arcade Classics
          </h2>
          <GameGrid games={arcadeClassics} priorityCount={0} />
        </section>
      )}

      {/* Puzzle Classics subsection */}
      {puzzleClassics.length > 0 && (
        <section>
          <h2 className="text-white font-bold text-xl mb-5">
            🧩 Puzzle Classics
          </h2>
          <GameGrid games={puzzleClassics} priorityCount={0} />
        </section>
      )}

      {/* SEO content block */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">The History of Classic Arcade Games</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Classic arcade games emerged in the late 1970s and defined an entire generation of
          entertainment. Games like Snake (popularized on Nokia phones), Breakout (created by
          Atari in 1976), and Pong (one of the earliest arcade video games ever made) laid the
          foundation for modern gaming. Their genius lies in elegant simplicity — one rule, one
          goal, infinite depth.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At <strong className="text-white">FreePlayArena</strong>, we've rebuilt these timeless
          games from the ground up using HTML5. That means they look sharp on modern high-DPI
          displays, run smoothly at 60fps, and work perfectly on touchscreens. You get all the
          nostalgic gameplay with none of the technical friction of old emulators or ROM sites.
        </p>

        <h2 className="text-white font-bold text-lg">Why Classic Games Never Get Old</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Modern games often require tutorials, story setups, and complex controls. Classic games
          do the opposite — you understand them in 10 seconds and spend hours mastering them.
          Games like <strong className="text-white">2048</strong> and{" "}
          <strong className="text-white">Minesweeper</strong> are pure logic challenges where
          every session is a fresh puzzle. <strong className="text-white">Snake</strong> and{" "}
          <strong className="text-white">Breakout</strong> are pure reflex tests — simple to pick
          up, impossible to fully master.
        </p>

        {/* Cross-links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "🧠 Brain Games", href: "/brain-games" },
            { label: "🏫 School Games", href: "/school-games" },
            { label: "🎮 HTML5 Games", href: "/html5-games" },
            { label: "🕹️ All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
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
            q: "Can I play Snake, Tetris, and Pong for free online?",
            a: "Yes. FreePlayArena hosts HTML5 versions of classic games like Snake, Breakout, Pong, and more — completely free, no download required. Open any game and start playing in seconds.",
          },
          {
            q: "Are these the original games?",
            a: "These are faithful HTML5 recreations inspired by the originals. They capture the core gameplay of the classics while running natively in modern browsers without emulators or plugins.",
          },
          {
            q: "Do classic games work on mobile?",
            a: "Yes. All our classic games are built with touch controls in mind. Snake, Breakout, 2048, and Sudoku all work perfectly on iPhone and Android without any app download.",
          },
          {
            q: "Why do classic games feel so addictive?",
            a: "Classic games use simple feedback loops — do action, get reward, increase difficulty. This \"easy to learn, hard to master\" design is scientifically engaging. It's the same reason Tetris has been studied in cognitive science research.",
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
