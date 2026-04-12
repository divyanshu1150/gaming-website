import { Game } from "@/types/game";
import gamesData from "@/data/games.json";

const games: Game[] = gamesData.games as Game[];

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getFeaturedGames(limit = 6): Game[] {
  return games.filter((g) => g.featured).slice(0, limit);
}

export function getPopularGames(limit = 8): Game[] {
  return [...games].sort((a, b) => b.plays - a.plays).slice(0, limit);
}

export function getGamesByCategory(categorySlug: string): Game[] {
  return games.filter((g) => g.category === categorySlug);
}

export function getRelatedGames(relatedSlugs: string[]): Game[] {
  return relatedSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean) as Game[];
}

export function getAllGameSlugs(): { slug: string }[] {
  return games.map((g) => ({ slug: g.slug }));
}

export function getAllCategorySlugs(): { slug: string }[] {
  const slugs = [...new Set(games.map((g) => g.category))];
  return slugs.map((slug) => ({ slug }));
}

export function getGamesByTag(tag: string): Game[] {
  return games.filter((g) => g.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  games.forEach((g) => g.tags.forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

export function getAllTagSlugs(): { tag: string }[] {
  return getAllTags().map((tag) => ({ tag }));
}

// Last N games added to the array — treated as "new"
export function getNewGames(limit = 8): Game[] {
  return [...games].slice(-limit).reverse();
}
