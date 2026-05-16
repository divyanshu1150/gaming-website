import { MetadataRoute } from "next";
import { getAllGameSlugs, getAllCategorySlugs, getAllTags, getGamesByTag, getAllGames } from "@/lib/games";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

// Use a stable build-time date so Google doesn't see "everything changed today"
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const gameSlugs = getAllGameSlugs();
  const categorySlugs = getAllCategorySlugs();
  const allTags = getAllTags();
  const allPosts = getAllPosts();
  const allGames = getAllGames();

  // Only include tags with at least 3 games (matches /tag/[tag]/page.tsx noindex threshold)
  const indexableTags = allTags.filter((tag) => getGamesByTag(tag).length >= 3);

  // Map game slug → game for date lookups
  const gameMap = new Map(allGames.map((g) => [g.slug, g]));

  // Static pages — manually maintained
  const staticPages = [
    { url: BASE_URL,                                    priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/games`,                         priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/blog`,                          priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/game-of-the-day`,               priority: 0.95, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/unblocked-games`,               priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/ad-free-games`,                 priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/free-games-for-kids`,           priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/2-player-games`,                priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/best-io-games`,                 priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/games-like-wordle`,             priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/puzzle-games`,                  priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/no-download-games`,             priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/games-to-play-when-bored`,      priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/school-games`,                  priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/html5-games`,                   priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/classic-games`,                 priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/clicker-games`,                 priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/brain-games`,                   priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`,                         priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`,                       priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacy-policy`,                priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/terms`,                         priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url,
      lastModified: BUILD_DATE,
      changeFrequency,
      priority,
    })),
    // Games — use releaseYear as a stable date so the sitemap doesn't shift
    // every build (Google ignores "everything modified now" signals).
    ...gameSlugs.map(({ slug }) => {
      const game = gameMap.get(slug);
      const lastMod = game?.releaseYear
        ? new Date(game.releaseYear, 0, 1)
        : BUILD_DATE;
      return {
        url: `${BASE_URL}/games/${slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    }),
    // Blog posts — only manually-written editorials and curated guides
    // Auto-generated how-to-play-* posts are noindexed and excluded from sitemap
    ...allPosts
      .filter((post) => !post.slug.startsWith("how-to-play-") || (post.sections && post.sections.length > 0))
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : post.publishedAt
            ? new Date(post.publishedAt)
            : BUILD_DATE,
        changeFrequency: "monthly" as const,
        priority: post.type === "editorial" ? 0.75 : 0.65,
      })),
    ...categorySlugs.map(({ slug }) => ({
      url: `${BASE_URL}/category/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    // Tags — only indexable ones (≥3 games)
    ...indexableTags.map((tag) => ({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
