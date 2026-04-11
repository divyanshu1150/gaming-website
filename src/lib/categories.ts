import { Category } from "@/types/game";

export const CATEGORIES: Category[] = [
  {
    slug: "action",
    name: "Action",
    description: "Fast-paced games that test your reflexes and skill",
    icon: "⚔️",
    color: "bg-red-500",
  },
  {
    slug: "puzzle",
    name: "Puzzle",
    description: "Brain-teasing games that challenge your thinking",
    icon: "🧩",
    color: "bg-purple-500",
  },
  {
    slug: "racing",
    name: "Racing",
    description: "Speed through tracks, beat the clock, and win",
    icon: "🏎️",
    color: "bg-yellow-500",
  },
  {
    slug: "sports",
    name: "Sports",
    description: "Football, pool, and more classic sports games",
    icon: "⚽",
    color: "bg-green-500",
  },
  {
    slug: "adventure",
    name: "Adventure",
    description: "Explore worlds, discover secrets, and survive",
    icon: "🗺️",
    color: "bg-blue-500",
  },
  {
    slug: "casual",
    name: "Casual",
    description: "Easy to pick up, hard to put down",
    icon: "🎮",
    color: "bg-pink-500",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
