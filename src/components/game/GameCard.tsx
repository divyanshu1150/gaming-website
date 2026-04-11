import Link from "next/link";
import { Game } from "@/types/game";
import GameThumbnail from "./GameThumbnail";

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

function formatPlays(plays: number): string {
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K`;
  return plays.toString();
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block bg-[#1a1a2e] rounded-xl overflow-hidden hover:bg-[#22223b] hover:scale-[1.03] transition-all duration-200 hover:shadow-lg hover:shadow-violet-900/30"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#111] overflow-hidden">
        <GameThumbnail
          src={game.thumbnail}
          alt={game.thumbnailAlt}
          title={game.title}
          priority={priority}
        />
        {game.featured && (
          <span className="absolute top-2 left-2 bg-violet-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate group-hover:text-violet-300 transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-400 text-xs capitalize">{game.category}</span>
          <span className="text-gray-500 text-xs">{formatPlays(game.plays)} plays</span>
        </div>
      </div>
    </Link>
  );
}
