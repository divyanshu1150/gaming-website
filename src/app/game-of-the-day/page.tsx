import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import GameEmbed from "@/components/game/GameEmbed";
import ShareButton from "@/components/game/ShareButton";

// Revalidate once per day so the featured game rotates at midnight UTC
export const revalidate = 86400;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

/** Deterministic daily seed — same game all day, different game tomorrow */
function getDailyGame(games: ReturnType<typeof getAllGames>) {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const idx = daysSinceEpoch % games.length;
  return games[idx];
}

/** Simple date formatter */
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const allGames = getAllGames();
  const game = getDailyGame(allGames);
  const today = formatDate(new Date());

  return {
    title: `Game of the Day: ${game.title} — Free Online — ${today}`,
    description: `Today's free game of the day is ${game.title}. ${game.shortDescription ?? game.description.slice(0, 120)} No download, no sign-up — play instantly.`,
    keywords: [
      "game of the day",
      "free game of the day",
      "daily free game",
      "today's free game",
      "game of the day free online",
      game.title.toLowerCase(),
      "browser game of the day",
    ],
    alternates: { canonical: `${BASE_URL}/game-of-the-day` },
    openGraph: {
      title: `Game of the Day: ${game.title}`,
      description: `Today's free pick: ${game.title}. Play instantly — no download needed.`,
      url: `${BASE_URL}/game-of-the-day`,
      type: "website",
    },
  };
}

export default function GameOfTheDayPage() {
  const allGames = getAllGames();
  const game = getDailyGame(allGames);
  const today = formatDate(new Date());
  const gameUrl = `${BASE_URL}/games/${game.slug}`;

  // Related games: same category, excluding today's pick
  const relatedGames = allGames
    .filter((g) => g.slug !== game.slug && g.category === game.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // Yesterday / tomorrow determinism for nav
  const todayMs = new Date().setHours(0, 0, 0, 0);
  const yesterdayGame = allGames[(Math.floor(todayMs / 86400000) - 1 + allGames.length) % allGames.length];
  const tomorrowHint = "Come back tomorrow for the next pick!";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          Daily Pick
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2">
          🎮 Game of the Day
        </h1>
        <p className="text-gray-400 text-sm">{today}</p>
      </div>

      {/* Today's game card */}
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-violet-400 bg-violet-500/20 px-2 py-0.5 rounded-full capitalize">
                {game.category}
              </span>
              <span className="text-xs text-yellow-400">
                ⭐ {game.rating.toFixed(1)}
              </span>
            </div>
            <h2 className="text-white font-bold text-2xl sm:text-3xl">{game.title}</h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl leading-relaxed">
              {game.shortDescription ?? game.description.slice(0, 200)}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <ShareButton title={game.title} url={gameUrl} />
            <Link
              href={`/games/${game.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-colors"
            >
              Full Page →
            </Link>
          </div>
        </div>

        <GameEmbed game={game} />
      </div>

      <AdSlot format="banner" className="w-full" />

      {/* Yesterday's pick */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-400 text-xs mb-1">Yesterday's Pick</p>
          <Link href={`/games/${yesterdayGame.slug}`} className="text-white font-semibold hover:text-violet-300 transition-colors">
            {yesterdayGame.title} →
          </Link>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs mb-1">Tomorrow</p>
          <p className="text-gray-500 text-sm">{tomorrowHint}</p>
        </div>
      </div>

      {/* More from same category */}
      {relatedGames.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">
              More {game.category.charAt(0).toUpperCase() + game.category.slice(1)} Games
            </h2>
            <Link href={`/category/${game.category}`} className="text-violet-400 hover:text-violet-300 text-sm">
              See all →
            </Link>
          </div>
          <GameGrid games={relatedGames} priorityCount={4} />
        </section>
      )}

      <AdSlot format="banner" className="w-full" />

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-4 max-w-2xl">
        <h2 className="text-white font-bold text-lg">About Game of the Day</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Every day at midnight UTC, FreePlayArena selects a new featured game from our library of
          400+ free browser games. Each pick is chosen to spotlight a different genre — one day it
          might be a fast-paced action game, the next a relaxing puzzle, then a strategy classic.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          All featured games are free to play instantly — no download, no sign-up, no credit card.
          Bookmark this page to check back daily for a fresh pick, or explore our full library of
          400+ games across six categories.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {[
            { label: "🎮 All Games", href: "/games" },
            { label: "🔥 Popular", href: "/games" },
            { label: "🧩 Puzzles", href: "/category/puzzle" },
            { label: "⚡ Action", href: "/category/action" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-white/10 hover:bg-violet-600 text-white text-sm rounded-lg transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
