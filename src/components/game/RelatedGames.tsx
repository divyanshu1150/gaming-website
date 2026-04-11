import Link from "next/link";
import { Game } from "@/types/game";
import GameThumbnail from "./GameThumbnail";

interface RelatedGamesProps {
  games: Game[];
}

export default function RelatedGames({ games }: RelatedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="group block bg-[#1a1a2e] rounded-xl overflow-hidden hover:bg-[#22223b] transition-colors"
          >
            <div className="relative aspect-video bg-[#111]">
              <GameThumbnail
                src={game.thumbnail}
                alt={game.thumbnailAlt}
                title={game.title}
              />
            </div>
            <div className="p-2">
              <p className="text-white text-xs font-medium truncate group-hover:text-violet-300">
                {game.title}
              </p>
              <p className="text-gray-500 text-xs capitalize">{game.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
