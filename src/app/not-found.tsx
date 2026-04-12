import Link from "next/link";
import { getPopularGames } from "@/lib/games";
import GameCard from "@/components/game/GameCard";

export default function NotFound() {
  const suggestions = getPopularGames(6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 404 hero */}
      <div className="text-center mb-12">
        <div className="text-7xl mb-4">🎮</div>
        <h1 className="text-white font-bold text-4xl mb-3">Page Not Found</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          This page doesn&apos;t exist or may have moved. But don&apos;t leave empty-handed — there are
          hundreds of free games waiting for you.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/games"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Games
          </Link>
        </div>
      </div>

      {/* Popular games to keep them on site */}
      {suggestions.length > 0 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Popular Games You Might Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {suggestions.map((game, i) => (
              <GameCard key={game.slug} game={game} priority={i < 3} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
