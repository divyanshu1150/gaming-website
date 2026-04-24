import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Unblocked Games — Play Free Online at School or Work",
  description:
    "Play unblocked games free online — no download, no login required. Works at school, work, or anywhere. 300+ HTML5 browser games that are never blocked.",
  keywords: [
    "unblocked games",
    "unblocked games at school",
    "unblocked games 66",
    "games not blocked at school",
    "school unblocked games",
    "unblocked games free",
    "play games at school",
    "unblocked html5 games",
    "browser games unblocked",
    "games to play at school",
  ],
  alternates: { canonical: "https://freeplayarena.com/unblocked-games" },
};

const UNBLOCKED_SLUGS = [
  "slime-jelly-bouncer",
  "all-dot-connect-puzzle-game",
  "skyfury",
  "pixel-dash-neon-run",
  "tiny-army",
  "dark-runner",
  "color-pop-mania",
  "pixel-drift-retro-tetris",
  "number-slide",
  "geometry-dash-cube-adventure",
  "blow-king",
  "pick-the-number",
  "shell-swap-pro",
  "panda-adventure",
  "cooking-alike",
  "boat-bear",
  "bamboo-panda",
  "ball-color-smash",
  "big-rolling-ball",
  "flippy-hero-jump-game",
  "blokku",
  "spike-rush",
  "pixel-commando",
  "fishy-feast",
  "neonroll",
  "fishflip",
  "prism-pulse",
  "zig-zag-color",
  "bubble-pop-frenzy",
  "physical-ball",
  "ghost-jump",
  "skyfury",
  "nail-stack-run-challenge",
  "war-space-defender",
  "go-up-tap-zigzag-box-challenge",
  "spacepuzzler",
  "torn-pieces",
  "word-safari",
  "endless-path-twist-ampamp-turn",
  "ball-color-smash",
  "skulls-and-bombs",
  "color-madness-spot-the-differences",
  "easter-match-3-saga",
  "arrow-swipe-game",
];

const CATEGORIES = [
  { label: "🎯 Action", href: "/tag/action" },
  { label: "🧩 Puzzle", href: "/category/puzzle" },
  { label: "🏃 Running", href: "/tag/run" },
  { label: "🎮 Casual", href: "/category/casual" },
  { label: "⚔️ Adventure", href: "/category/adventure" },
  { label: "🔫 Shooting", href: "/tag/shooting" },
];

export default function UnblockedGamesPage() {
  const allGames = getAllGames();

  // Primary: curated list
  const curatedGames = UNBLOCKED_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  // Fill up with top-rated games not already in curated
  const curatedSlugs = new Set(curatedGames.map((g) => g.slug));
  const fillGames = allGames
    .filter((g) => !curatedSlugs.has(g.slug) && g.category !== "racing" && g.category !== "sports")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 60);

  const displayGames = [...curatedGames, ...fillGames];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-violet-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Always Unblocked
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Unblocked Games
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Play <strong className="text-white">free unblocked games</strong> directly in your browser —
            no download, no sign-up, no plugins. Works at school, work, or anywhere.
            All games are HTML5-based and load instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-4 py-2 bg-white/10 hover:bg-violet-600 text-white text-sm rounded-lg transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why unblocked */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🏫",
            title: "Works at School",
            body: "All games run on standard HTML5 — no Flash, no Unity, no special plugins. If your browser works, the games work.",
          },
          {
            icon: "⚡",
            title: "Instant Load",
            body: "Pure HTML5 and JavaScript games. No large downloads, no waiting. Most games are playable within 3 seconds.",
          },
          {
            icon: "🔒",
            title: "No Login Required",
            body: "Zero sign-ups, zero accounts. Just open a game and start playing. Your recently played games are saved locally.",
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

      {/* Game grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🎮 Unblocked Games ({displayGames.length}+)
          </h2>
          <Link href="/games" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={displayGames} priorityCount={8} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">
          What Are Unblocked Games?
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Unblocked games are browser-based games that can be played anywhere — including schools,
          offices, and networks that restrict access to gaming websites. Unlike traditional games
          that require downloads or plugins, unblocked games run entirely in your web browser using
          HTML5 and JavaScript. This means no installation, no admin permissions, and no blocked
          file downloads.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          At <strong className="text-white">FreePlayArena</strong>, every game in our library is an
          HTML5 browser game — which means every game is technically an unblocked game. We don't
          use Flash (discontinued), Unity WebGL (heavy downloads), or any plugins that schools
          typically block. All you need is a modern browser like Chrome, Firefox, Safari, or Edge.
        </p>

        <h2 className="text-white font-bold text-lg mt-4">
          Best Unblocked Games to Play at School
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          The best unblocked games for school are ones that load fast, work in a browser tab, and
          can be quickly minimized. Puzzle games like <strong className="text-white">Slime Jelly Bouncer</strong>,{" "}
          <strong className="text-white">Ball Color Smash</strong>, and{" "}
          <strong className="text-white">Number Slide</strong> are perfect — they're quick to start,
          easy to pause, and don't require sound to enjoy. Action games like{" "}
          <strong className="text-white">Dark Runner</strong> and{" "}
          <strong className="text-white">Pixel Commando</strong> are also great picks for a quick
          gaming break.
        </p>

        <h2 className="text-white font-bold text-lg mt-4">
          Are These Games Really Unblocked?
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Our games are served over standard HTTPS from a trusted domain. They use no special ports,
          no peer-to-peer connections, and no browser extensions. While no website can guarantee
          it will never be blocked by a specific school or employer's firewall, our HTML5 games
          are far less likely to be blocked than traditional gaming sites that rely on Flash or
          large plugin downloads.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          If a specific game is blocked on your network, try a different game from our collection —
          with {displayGames.length}+ titles available, there's always something you can play.
        </p>

        <h2 className="text-white font-bold text-lg mt-4">
          Unblocked Games by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Unblocked Puzzle Games", href: "/category/puzzle" },
            { label: "Unblocked Action Games", href: "/category/action" },
            { label: "Unblocked Casual Games", href: "/category/casual" },
            { label: "Unblocked Adventure Games", href: "/category/adventure" },
            { label: "Unblocked 2-Player Games", href: "/tag/2players" },
            { label: "Unblocked Running Games", href: "/tag/run" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
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
            q: "Can I play these games at school?",
            a: "Yes. All games on FreePlayArena are HTML5-based browser games that work on any standard internet connection. They require no downloads, no plugins, and no special software — just a web browser.",
          },
          {
            q: "Do unblocked games work on Chromebooks?",
            a: "Absolutely. HTML5 games run natively in Chrome browser on Chromebooks with no extensions or workarounds needed.",
          },
          {
            q: "Are unblocked games safe?",
            a: "Yes. All games on this site are sourced from trusted HTML5 game publishers. There are no downloads, no executable files, and no malware. The games run entirely in your browser.",
          },
          {
            q: "Do I need to create an account?",
            a: "No account required. Open any game and start playing instantly. Your recently played games are remembered in your browser automatically.",
          },
          {
            q: "What if a game is still blocked on my network?",
            a: "Individual school or office firewalls may block specific domains. If a game doesn't load, try a different one — we have 300+ alternatives. You can also try accessing the site from a different network or using your phone's mobile data.",
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
