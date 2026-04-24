import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Free Online Puzzle Games — Play Instantly, No Download",
  description:
    "Play the best free online puzzle games in your browser. Brain teasers, match-3, logic, word games and more. No download, no sign-up required.",
  keywords: [
    "puzzle games online free",
    "free puzzle games no download",
    "browser puzzle games",
    "logic games online",
    "brain games free",
    "match 3 games online",
    "word puzzle games free",
    "online puzzle games",
  ],
  alternates: { canonical: "https://freeplayarena.com/puzzle-games" },
};

const TOP_SLUGS = [
  "slime-jelly-bouncer","all-dot-connect-puzzle-game","goods-sorting-shopping-master",
  "arrow-swipe-game","color-pop-mania","panda-adventure","cooking-alike",
  "color-madness-spot-the-differences","ball-color-smash","big-rolling-ball",
  "spacepuzzler","blokku","torn-pieces","word-safari","ball-sort-2d",
];

export default function PuzzleGamesPage() {
  const all = getAllGames();
  const top = TOP_SLUGS.map(s => all.find(g => g.slug === s)).filter(Boolean) as typeof all;
  const topSlugs = new Set(TOP_SLUGS);
  const rest = all.filter(g => g.category === "puzzle" && !topSlugs.has(g.slug))
    .sort((a,b) => b.rating - a.rating);
  const games = [...top, ...rest];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8">
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Free Online Puzzle Games
        </h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl">
          Challenge your brain with {games.length}+ free online puzzle games — no download, no sign-up.
          From match-3 and word puzzles to logic challenges and physics games, every title runs
          instantly in your browser on any device.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Match 3", href: "/tag/match3" },
          { label: "Word Games", href: "/tag/word" },
          { label: "Logic", href: "/tag/logic" },
          { label: "Sorting", href: "/tag/sorting" },
        ].map(({ label, href }) => (
          <Link key={href} href={href}
            className="flex items-center justify-center py-3 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-gray-300 hover:text-white text-sm rounded-xl transition-all text-center">
            {label}
          </Link>
        ))}
      </div>

      <AdSlot format="banner" className="w-full" />

      <section>
        <h2 className="text-white font-bold text-xl mb-5">🧩 All Puzzle Games ({games.length})</h2>
        <GameGrid games={games} priorityCount={8} />
      </section>

      <AdSlot format="banner" className="w-full" />

      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-white font-bold text-xl">Why Play Puzzle Games Online?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Puzzle games are one of the most popular game genres on the web — and for good reason.
          They sharpen your problem-solving skills, improve memory, and provide a satisfying sense
          of accomplishment when you crack a tough level. Unlike action games, puzzle games are
          perfect for any environment — quiet offices, classrooms, or lazy afternoons at home.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At <strong className="text-white">FreePlayArena</strong>, our puzzle collection spans
          dozens of sub-genres: ball sorting games, sliding number puzzles, connect-the-dots
          challenges, physics-based puzzlers, color matching games, and word games. All are
          browser-based HTML5 games — meaning they load in seconds with zero installation.
        </p>
        <h2 className="text-white font-bold text-lg">Tips for Puzzle Games</h2>
        <ul className="space-y-2 text-gray-400 text-sm">
          {[
            "Take your time — most puzzle games have no time limit. Rushing leads to mistakes.",
            "Work backwards from the goal. Visualize the end state before making your first move.",
            "For sorting games, identify which items need to move the fewest times.",
            "If you're stuck, step away for a minute. Fresh eyes often spot solutions instantly.",
            "Use the undo button liberally — it's there to experiment without penalty.",
          ].map(tip => (
            <li key={tip} className="flex gap-2">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "🎮 All Games", href: "/games" },
          { label: "⚔️ Action Games", href: "/category/action" },
          { label: "🎲 Casual Games", href: "/category/casual" },
          { label: "🔓 Unblocked Games", href: "/unblocked-games" },
          { label: "🗺️ Adventure Games", href: "/category/adventure" },
          { label: "⭐ Featured Games", href: "/games?featured=true" },
        ].map(({ label, href }) => (
          <Link key={href} href={href}
            className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-sm rounded-xl transition-all text-center">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
