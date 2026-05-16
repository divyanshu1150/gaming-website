import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { CollectionPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Games Like Wordle — Free Word Guessing Games Online",
  description:
    "Love Wordle? Play free games like Wordle online — word guessing games, daily puzzles, and vocabulary challenges. No download, no sign-up, instant play in your browser.",
  keywords: [
    "games like wordle",
    "wordle alternatives",
    "free wordle games",
    "word guessing games online",
    "daily word games",
    "wordle similar games",
    "free word games like wordle",
    "browser word games",
    "online word puzzles",
    "wordle free online",
  ],
  alternates: { canonical: "https://freeplayarena.com/games-like-wordle" },
  openGraph: {
    title: "Games Like Wordle — Free Word Games Online",
    description:
      "Love Wordle? Discover free alternatives — word guessing games, daily puzzles, and vocabulary challenges. No download needed.",
    url: "https://freeplayarena.com/games-like-wordle",
    type: "website",
  },
};

const WORDLE_LIKE_SLUGS = [
  "wordle-plus",
  "wordle",
  "hello-wordl",
  "word-safari",
  "word-tangle",
  "word-search-universe-easter",
  "tiny-word-gridampnbsp",
];

const WORD_PUZZLE_SLUGS = [
  "2048-classic",
  "sudoku-classic",
  "sudoku-timer",
  "minesweeper-pro",
  "sliding-tiles-puzzle",
  "lights-out",
  "sokoban-omerkel",
];

const TOP_PUZZLE_SLUGS = [
  "neon-circuit",
  "torn-pieces",
  "magic-water-sort-color-puzzle",
  "merges-numbers",
  "ball-sort-2d",
  "panda-adventure",
  "get-rich-in",
];

export default function GamesLikeWordlePage() {
  const allGames = getAllGames();

  const wordleGames = WORDLE_LIKE_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const wordPuzzles = WORD_PUZZLE_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const topPuzzles = TOP_PUZZLE_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const allShown = new Set([...WORDLE_LIKE_SLUGS, ...WORD_PUZZLE_SLUGS, ...TOP_PUZZLE_SLUGS]);

  const morePuzzles = allGames
    .filter((g) => !allShown.has(g.slug) && g.category === "puzzle")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 24);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CollectionPageSchema
        name="Games Like Wordle"
        description="Free games like Wordle — unlimited word guessing, daily puzzles, vocabulary challenges."
        url="/games-like-wordle"
        games={wordleGames}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Games Like Wordle", url: "/games-like-wordle" },
        ]}
      />
      {/* Hero */}
      <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/20 rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="text-base">📝</span>
          Word Puzzle Games
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Games Like Wordle
        </h1>
        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
          Love the daily word-guessing challenge of Wordle? Here are the best{" "}
          <strong className="text-white">free games like Wordle</strong> you can play right now —
          word puzzles, daily challenges, vocabulary games, and more mind-bending alternatives.
          All free, all instant, no download required.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "📝 Word Games", href: "/tag/word" },
            { label: "🧩 Puzzle Games", href: "/category/puzzle" },
            { label: "🧠 Brain Games", href: "/brain-games" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-white/10 hover:bg-yellow-600 text-white text-sm rounded-lg transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Wordle-like games */}
      <section>
        <h2 className="text-white font-bold text-xl mb-2">
          🟨 Direct Wordle Alternatives
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          Word guessing games with the same satisfying guess-and-deduce mechanic as the original Wordle.
        </p>
        <GameGrid games={wordleGames} priorityCount={wordleGames.length} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* Word puzzle section */}
      <section>
        <h2 className="text-white font-bold text-xl mb-2">
          🧩 Logic Puzzles You'll Love
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          If you love Wordle's "one puzzle a day" style, these logic games scratch the same mental itch.
        </p>
        <GameGrid games={wordPuzzles} priorityCount={8} />
      </section>

      <section>
        <h2 className="text-white font-bold text-xl mb-5">
          ⭐ Top-Rated Puzzle Games
        </h2>
        <GameGrid games={topPuzzles} priorityCount={4} />
      </section>

      <section>
        <h2 className="text-white font-bold text-xl mb-5">
          🎮 More Puzzle Games
        </h2>
        <GameGrid games={morePuzzles} priorityCount={4} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5 max-w-3xl">
        <h2 className="text-white font-bold text-xl">The Best Free Games Like Wordle</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Wordle became a cultural phenomenon by offering a simple but deeply satisfying daily
          challenge: guess a 5-letter word in 6 tries, using color-coded feedback to narrow down
          your options. The game's genius lies in its elegance — easy to understand, hard to
          master, and perfectly tuned for a daily habit.
        </p>

        <h3 className="text-white font-semibold text-lg">Wordle+ — Unlimited Wordle</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          <Link href="/games/wordle-plus" className="text-violet-400 hover:text-violet-300">Wordle+</Link>{" "}
          is the closest alternative to the original — it offers unlimited word-guessing rounds
          so you don't have to wait until tomorrow. The same green/yellow/gray feedback system,
          the same 5-letter words, but playable whenever you want.
        </p>

        <h3 className="text-white font-semibold text-lg">Hello Wordl — Adjustable Word Length</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          <Link href="/games/hello-wordl" className="text-violet-400 hover:text-violet-300">Hello Wordl</Link>{" "}
          takes the Wordle format and adds a key twist: you can set the word length from 4 to 11
          letters. This makes it perfect for both beginners (shorter words are easier) and hardcore
          word game fans looking for a tougher challenge.
        </p>

        <h3 className="text-white font-semibold text-lg">Sudoku — The Other Daily Puzzle Classic</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          If you love Wordle's deductive reasoning, you'll also love{" "}
          <Link href="/games/sudoku-classic" className="text-violet-400 hover:text-violet-300">Sudoku</Link>.
          Both games rely on the same core skill: using limited information to eliminate possibilities
          until only one answer remains. Sudoku is more complex but equally satisfying to complete.
        </p>

        <h3 className="text-white font-semibold text-lg">Why Do People Love Wordle-Style Games?</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Wordle-style games tap into several powerful psychological rewards: the satisfaction of
          solving a puzzle, the social sharing element (comparing results with friends), and the
          daily ritual aspect. The limited daily attempts create anticipation and make each win
          feel earned. If you want that same feeling, any game that involves deduction, process of
          elimination, or "aha moment" solving will scratch the same itch.
        </p>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="text-white font-semibold">FAQ</h3>
          {[
            {
              q: "What is the best free Wordle alternative?",
              a: "Wordle+ (Infinite Wordle) is the closest free alternative — it uses the exact same mechanic as the original but with unlimited daily plays, not just one per day.",
            },
            {
              q: "Are there Wordle games that aren't words?",
              a: "Yes — the Wordle format has been applied to numbers (Nerdle), music (Heardle), geography (Worldle), and many other variations. On FreePlayArena, similar deductive puzzle games include Sudoku and 2048.",
            },
            {
              q: "Can I play Wordle for free?",
              a: "Yes. The original Wordle is available free on the New York Times website (one word per day). Wordle+ on FreePlayArena gives you unlimited rounds for free.",
            },
            {
              q: "What word games are similar to Wordle?",
              a: "Hello Wordl, Word Safari, and Word Tangle on this site all use similar word-deduction mechanics. For pure vocabulary challenges, Word Search is also a great pick.",
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
        <h2 className="text-white font-semibold mb-4">More Word & Puzzle Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "🧩 All Puzzle Games", href: "/puzzle-games" },
            { label: "🧠 Brain Games", href: "/brain-games" },
            { label: "✓ Ad Free Games", href: "/ad-free-games" },
            { label: "📝 Game Guides Blog", href: "/blog" },
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
