import { Game } from "@/types/game";

export function searchGames(games: Game[], query: string): Game[] {
  if (!query.trim()) return games;
  const q = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.shortDescription.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
