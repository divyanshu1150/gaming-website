import { MetadataRoute } from "next";
import { getAllGameSlugs, getAllCategorySlugs, getAllTagSlugs } from "@/lib/games";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const gameSlugs = getAllGameSlugs();
  const categorySlugs = getAllCategorySlugs();
  const tagSlugs = getAllTagSlugs();

  // Static pages — manually maintained
  const staticPages = [
    { url: BASE_URL,                                    priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/games`,                         priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/unblocked-games`,               priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/puzzle-games`,                  priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/no-download-games`,             priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/games-to-play-when-bored`,      priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`,                         priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`,                       priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacy-policy`,                priority: 0.4, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/terms`,                         priority: 0.4, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...gameSlugs.map(({ slug }) => ({
      url: `${BASE_URL}/games/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categorySlugs.map(({ slug }) => ({
      url: `${BASE_URL}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tagSlugs.map(({ tag }) => ({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
