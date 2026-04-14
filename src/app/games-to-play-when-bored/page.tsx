import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Games to Play When Bored — Free Browser Games, No Download",
  description:
    "Bored? Play 300+ free browser games instantly — no download, no sign-up. The best games to kill time online right now.",
  keywords: [
    "games to play when bored",
    "games when bored online",
    "bored games online free",
    "fun games to play online",
    "kill time games online",
    "games to play right now",
    "free online games when bored",
    "addictive browser games",
    "games to play for free",
  ],
};

const PICKS = [
  "geometry-dash-cube-adventure","slime-jelly-bouncer","pixel-dash-neon-run",
  "dark-runner","skyfury","blow-king","spike-rush","neonroll",
  "ghost-jump","bamboo-panda","flippy-hero-jump-game","color-pop-mania",
  "bubble-pop-frenzy","fishflip","shell-swap-pro","prism-pulse",
  "number-slide","blokku","tiny-army","panda-adventure",
];

const MOODS = [
  { emoji: "🧠", label: "Use Your Brain", href: "/category/puzzle", desc: "Puzzle & logic games" },
  { emoji: "⚡", label: "Quick & Addictive", href: "/category/casual", desc: "Casual one-tap games" },
  { emoji: "⚔️", label: "Action Rush", href: "/category/action", desc: "Fast-paced action" },
  { emoji: "🗺️", label: "Explore", href: "/category/adventure", desc: "Adventure games" },
];

export default function BoredGamesPage() {
  const all = getAllGames();
  const picks = PICKS.map(s => all.find(g => g.slug === s)).filter(Boolean) as typeof all;
  const pickSlugs = new Set(PICKS);
  const rest = all
    .filter(g => !pickSlugs.has(g.slug))
    .sort((a,b) => b.rating - a.rating)
    .slice(0, 80);
  const games = [...picks, ...rest];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 sm:p-10">
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Games to Play When Bored 😴
        </h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mb-6">
          Bored? We've got you. Browse {games.length}+ free browser games that load instantly —
          no download, no account, no waiting. Just pick a game and start playing right now.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOODS.map(({ emoji, label, href, desc }) => (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1 p-4 bg-white/10 hover:bg-violet-600/30 rounded-xl transition-all text-center group">
              <span className="text-3xl">{emoji}</span>
              <span className="text-white text-sm font-semibold group-hover:text-violet-300">{label}</span>
              <span className="text-gray-400 text-xs">{desc}</span>
            </Link>
          ))}
        </div>
      </div>

      <AdSlot format="banner" className="w-full" />

      <section>
        <h2 className="text-white font-bold text-xl mb-2">🔥 Best Picks Right Now</h2>
        <p className="text-gray-400 text-sm mb-5">Hand-picked for maximum fun when you have nothing to do.</p>
        <GameGrid games={picks} priorityCount={8} />
      </section>

      <section>
        <h2 className="text-white font-bold text-xl mb-5">More Games to Explore</h2>
        <GameGrid games={rest} priorityCount={0} />
      </section>

      <AdSlot format="banner" className="w-full" />

      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-4 max-w-3xl">
        <h2 className="text-white font-bold text-xl">What to Play When You're Bored</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          The best cure for boredom is a game that pulls you in immediately — no tutorials, no
          lengthy setup, just instant fun. That's exactly what FreePlayArena is built for.
          Every game launches directly in your browser with a single click. No downloads,
          no accounts, no paywalls.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          If you have just a few minutes, try a quick casual game like{" "}
          <Link href="/games/geometry-dash-cube-adventure" className="text-violet-400 hover:underline">Geometry Dash Cube Adventure</Link>{" "}
          or <Link href="/games/number-slide" className="text-violet-400 hover:underline">Number Slide</Link>.
          For longer sessions, dive into a puzzle series or an action game that gets progressively harder.
        </p>
        <h3 className="text-white font-semibold">Best game types when bored:</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          {[
            "Idle & clicker games — rewarding even when you're half paying attention",
            "Endless runner games — easy to pick up, hard to put down",
            "Puzzle games — satisfying to solve, especially sorting and matching games",
            "One-tap casual games — perfect for short attention spans",
            "Word games — stimulating without being stressful",
          ].map(t => (
            <li key={t} className="flex gap-2">
              <span className="text-violet-400">•</span><span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
