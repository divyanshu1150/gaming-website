import { Game } from "@/types/game";
import GameCard from "./GameCard";

interface GameGridProps {
  games: Game[];
  emptyMessage?: string;
  priorityCount?: number;
}

export default function GameGrid({
  games,
  emptyMessage = "No games found.",
  priorityCount = 4,
}: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">🎮</div>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} priority={i < priorityCount} />
      ))}
    </div>
  );
}
