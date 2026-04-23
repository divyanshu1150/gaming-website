import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Free Brain Games Online — Puzzle & Mind Training Games",
  description:
    "Challenge your mind with free brain games online — logic puzzles, memory games, and strategy challenges. Play instantly, no download or signup required.",
  keywords: [
    "brain games free online",
    "brain training games",
    "mind games online",
    "cognitive games free",
    "logic games online free",
    "memory games online",
    "brain teaser games",
    "puzzle brain games",
    "free mind training games",
    "educational brain games",
  ],
};

const COGNITIVE_BENEFITS = [
  {
    icon: "🧠",
    title: "Memory",
    body: "Memory matching and sequence games strengthen short-term and working memory by requiring you to recall patterns, positions, and sequences under time pressure.",
  },
  {
    icon: "⚡",
    title: "Processing Speed",
    body: "Fast-paced logic and reaction games train your brain to process information more quickly — a skill that benefits everyday decision-making.",
  },
  {
    icon: "🎯",
    title: "Focus & Attention",
    body: "Puzzle games that demand sustained concentration — like Sudoku and logic chains — strengthen your ability to filter distractions and maintain focus.",
  },
  {
    icon: "🔄",
    title: "Flexible Thinking",
    body: "Games that require shifting strategies mid-play build cognitive flexibility — the ability to adapt thinking when your first approach isn't working.",
  },
  {
    icon: "🔢",
    title: "Numerical Reasoning",
    body: "Number puzzles, 2048, and arithmetic games keep your numerical reasoning skills sharp in a fun, low-pressure environment.",
  },
  {
    icon: "📐",
    title: "Spatial Reasoning",
    body: "Sorting, stacking, and pattern-matching games exercise your ability to visualize objects in space — a key component of STEM thinking.",
  },
];

export default function BrainGamesPage() {
  const all = getAllGames();

  // Brain/logic/educational filter
  const brainGames = all.filter(
    (g) =>
      g.tags.includes("brain") ||
      g.tags.includes("logic") ||
      g.tags.includes("educational") ||
      g.category === "puzzle"
  );

  // Deduplicate
  const seen = new Set<string>();
  const deduped = brainGames.filter((g) => {
    if (seen.has(g.slug)) return false;
    seen.add(g.slug);
    return true;
  });

  // Top brain games
  const topBrain = [...deduped]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-cyan-900/60 to-teal-900/60 border border-cyan-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Train Your Mind
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Free Brain Games Online
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Challenge your mind with <strong className="text-white">free brain training games</strong> —
            logic puzzles, memory challenges, strategy games, and cognitive exercises. All games run
            instantly in your browser with no download or sign-up. Give your brain a workout while
            having fun.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "🧩 Puzzles", href: "/puzzle-games" },
              { label: "🔢 Logic", href: "/tag/logic" },
              { label: "🃏 Memory", href: "/tag/memory" },
              { label: "📚 Educational", href: "/tag/educational" },
              { label: "🏫 School Games", href: "/school-games" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white/10 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AdSlot slot="brain-games-top" className="w-full" />

      {/* Top Brain Games */}
      {topBrain.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">
              🏆 Top Brain Games
            </h2>
            <Link href="/puzzle-games" className="text-cyan-400 hover:text-cyan-300 text-sm">
              All puzzle games →
            </Link>
          </div>
          <GameGrid games={topBrain} priorityCount={8} />
        </section>
      )}

      {/* All Brain Games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🧠 All Brain &amp; Mind Games ({deduped.length})
          </h2>
        </div>
        <GameGrid games={deduped} priorityCount={0} />
      </section>

      <AdSlot slot="brain-games-mid" className="w-full" />

      {/* Cognitive benefits grid */}
      <section className="space-y-5">
        <h2 className="text-white font-bold text-xl">Cognitive Benefits of Brain Games</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Research suggests that mentally stimulating activities can help maintain cognitive
          sharpness. Here are the key skills that puzzle and brain games exercise:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COGNITIVE_BENEFITS.map(({ icon, title, body }) => (
            <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content block */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">What Are Brain Training Games?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Brain training games are games specifically designed to challenge cognitive functions:
          memory, logic, attention, processing speed, and spatial reasoning. They differ from
          purely entertainment-focused games in that every mechanic has a cognitive purpose —
          whether it's remembering tile positions, solving multi-step logic chains, or quickly
          identifying patterns under time pressure.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At <strong className="text-white">FreePlayArena</strong>, our brain game collection
          includes puzzle games, logic games, educational games, and classic mind-challenge games
          like Sudoku and Minesweeper. All are free, browser-based HTML5 games — no app to
          download, no subscription to start, just open and play.
        </p>

        <h2 className="text-white font-bold text-lg">Do Brain Games Actually Work?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          The research is nuanced. Studies show that playing brain training games improves
          performance on those specific types of tasks. Whether those gains transfer broadly
          to everyday cognition is still debated in neuroscience. What is clear: regularly
          engaging your brain with novel challenges — including puzzle games — is associated
          with maintaining cognitive health, especially as we age. And games that are fun are
          more likely to be played consistently, which is what matters.
        </p>

        <h2 className="text-white font-bold text-lg">Best Brain Games for Different Goals</h2>
        <ul className="space-y-2 text-gray-400 text-sm">
          {[
            "For memory training: Memory Match, pattern recall games",
            "For logic and reasoning: Sudoku, Minesweeper, logic chain puzzles",
            "For speed and reaction: fast-paced color and pattern matching games",
            "For spatial reasoning: ball sorting, block fitting, and stacking puzzles",
            "For language skills: word games, word search, scramble puzzles",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Cross-links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "🏫 School Games", href: "/school-games" },
            { label: "🕹️ Classic Games", href: "/classic-games" },
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🚫 Ad-Free Games", href: "/ad-free-games" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
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
            q: "Are brain training games actually effective?",
            a: "Playing brain games improves performance on the types of tasks in those games. Regular engagement with cognitively challenging activities is associated with maintaining mental sharpness. At minimum, they're far more stimulating than passive entertainment.",
          },
          {
            q: "How long should I play brain games each day?",
            a: "Most cognitive researchers suggest 15–20 minutes of focused mental exercise per day is beneficial. Short, focused sessions are more effective than long marathon sessions for cognitive training purposes.",
          },
          {
            q: "Are these brain games suitable for kids?",
            a: "Yes. Games like Memory Match, Sudoku, word puzzles, and logic games are excellent for children. They build pattern recognition, vocabulary, and problem-solving skills in a fun context.",
          },
          {
            q: "Do I need to sign up to play brain games?",
            a: "No account needed. Open any game on FreePlayArena and start playing immediately. Your recently played games are remembered locally in your browser.",
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
