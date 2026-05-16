import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { CollectionPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "2 Player Games — Free Online Two-Player Browser Games",
  description:
    "Play free 2 player games online — no download, no sign-up. Chess, Tic Tac Toe, and competitive browser games you can play with a friend on the same screen or solo.",
  keywords: [
    "2 player games",
    "two player games online",
    "2 player games online free",
    "games for 2 players",
    "2 player browser games",
    "multiplayer browser games",
    "play with a friend online",
    "local multiplayer browser games",
    "2 player games no download",
    "free 2 player games",
  ],
  alternates: { canonical: "https://freeplayarena.com/2-player-games" },
  openGraph: {
    title: "2 Player Games — Free Online Two-Player Browser Games",
    description:
      "Free 2 player browser games — chess, tic tac toe, and competitive games for two. No download needed.",
    url: "https://freeplayarena.com/2-player-games",
    type: "website",
  },
};

const TWO_PLAYER_SLUGS = [
  "ultimate-chess",
  "tic-tac-toe-html",
  "fishy-feast",
  "aichessgame",
  "connect-four-kenrick",
  "checkers-draughts",
  "reversi-ogeon",
  "battleship-bgtti",
  "antistress-relaxation-toys",
  "alien-clicker-invaders",
];

const COMPETITIVE_SLUGS = [
  "punch-champions",
  "ultra-kick-goal-crazy",
  "horse-racing",
  "pong-browser",
  "noobs-crazy-combo",
  "antistress-relaxation-toys-mini-games",
];

export default function TwoPlayerGamesPage() {
  const allGames = getAllGames();

  const twoPlayerGames = TWO_PLAYER_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const competitiveGames = COMPETITIVE_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const allSlugs = new Set([...TWO_PLAYER_SLUGS, ...COMPETITIVE_SLUGS]);
  const fillGames = allGames
    .filter(
      (g) =>
        !allSlugs.has(g.slug) &&
        g.tags?.some((t) =>
          ["board", "chess", "strategy", "classic", "competitive"].some((k) => t.includes(k))
        )
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CollectionPageSchema
        name="2 Player Games"
        description="Free 2 player browser games — Chess, Checkers, Connect Four. No download."
        url="/2-player-games"
        games={twoPlayerGames}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "2 Player Games", url: "/2-player-games" },
        ]}
      />
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="text-base">👥</span>
          Play With a Friend
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          2 Player Games
        </h1>
        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
          Free <strong className="text-white">2 player games</strong> you can play online with a
          friend — no download, no account. Play classic board games like Chess and Checkers,
          competitive arcade games, or take turns on the same device. Everything runs instantly
          in your browser.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "♟️ Board Games", href: "/tag/board" },
            { label: "⚔️ Strategy", href: "/tag/strategy" },
            { label: "🏆 Competitive", href: "/category/sports" },
            { label: "🎮 All Games", href: "/games" },
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

      {/* 2 player section */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">
          ♟️ Classic 2 Player Games
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Take turns or play head-to-head. These games are designed for two players on the same screen or vs. AI.
        </p>
        <GameGrid games={twoPlayerGames} priorityCount={8} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* Competitive section */}
      {competitiveGames.length > 0 && (
        <section>
          <h2 className="text-white font-bold text-xl mb-5">
            🏆 Competitive Games
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Challenge a friend to see who scores higher — racing games, sports, and fast-paced action.
          </p>
          <GameGrid games={competitiveGames} priorityCount={6} />
        </section>
      )}

      {/* Strategy fill */}
      {fillGames.length > 0 && (
        <section>
          <h2 className="text-white font-bold text-xl mb-5">
            🧠 Strategy & Board Games
          </h2>
          <GameGrid games={fillGames} priorityCount={4} />
        </section>
      )}

      <AdSlot format="banner" className="w-full" />

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5 max-w-3xl">
        <h2 className="text-white font-bold text-xl">The Best Free 2 Player Games Online</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Two-player browser games are perfect when you want to challenge a friend without any setup.
          All games on this page work instantly in your browser — no accounts, no downloads, no
          software to install. The best part: many of these games work on a single device, letting
          you take turns or play side-by-side.
        </p>

        <h3 className="text-white font-semibold text-lg">Classic Board Games</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Board game fans will love the collection here.{" "}
          <Link href="/games/ultimate-chess" className="text-violet-400 hover:text-violet-300">Chess</Link>,{" "}
          <Link href="/games/checkers-draughts" className="text-violet-400 hover:text-violet-300">Checkers</Link>,{" "}
          <Link href="/games/connect-four-kenrick" className="text-violet-400 hover:text-violet-300">Connect Four</Link>,{" "}
          <Link href="/games/reversi-ogeon" className="text-violet-400 hover:text-violet-300">Reversi</Link>, and{" "}
          <Link href="/games/battleship-bgtti" className="text-violet-400 hover:text-violet-300">Battleship</Link>{" "}
          are all available — all ad-free, all playable vs. AI or a second player. These are the
          real versions of the games you know, running cleanly in HTML5.
        </p>

        <h3 className="text-white font-semibold text-lg">Competitive Arcade Games</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          If board games aren't your style, try competitive arcade games. Take turns in{" "}
          <Link href="/games/punch-champions" className="text-violet-400 hover:text-violet-300">Punch Champions</Link>{" "}
          or race each other in our sports section. Many of these games let players compare scores
          on the same device, making them great for quick challenges between friends or siblings.
        </p>

        <h3 className="text-white font-semibold text-lg">Tic Tac Toe & Simple Games</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Sometimes the simplest games are the most fun.{" "}
          <Link href="/games/tic-tac-toe-html" className="text-violet-400 hover:text-violet-300">Tic Tac Toe</Link>{" "}
          is perfect for a quick game with anyone nearby, while{" "}
          <Link href="/games/pong-browser" className="text-violet-400 hover:text-violet-300">Pong</Link>{" "}
          delivers the classic two-paddle experience that started video gaming.
        </p>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">FAQ — 2 Player Browser Games</h3>
          <div className="space-y-4">
            {[
              {
                q: "Do these games require two devices?",
                a: "No. Most games on this page support hot-seat play (two players taking turns on the same device) or vs. AI mode. For real-time online multiplayer, you'd need separate devices.",
              },
              {
                q: "Can I play chess against the computer?",
                a: "Yes — both Ultimate Chess and AI Chess Game on this site let you play against a computer opponent at adjustable difficulty levels.",
              },
              {
                q: "Are there any real-time multiplayer games?",
                a: "Most browser games here are turn-based or score-based competitive games. For real-time multiplayer, check out our action and sports categories which have competitive games you can compare scores on.",
              },
              {
                q: "Do these games work on mobile?",
                a: "Yes. All games here are HTML5 and work on smartphones and tablets. Board games like Chess and Connect Four work especially well on touchscreens.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h4 className="text-white font-semibold text-sm mb-1">{q}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section>
        <h2 className="text-white font-semibold mb-4">More Game Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "♟️ Strategy Games", href: "/tag/strategy" },
            { label: "🎮 Classic Games", href: "/classic-games" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "⚽ Sports Games", href: "/category/sports" },
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
