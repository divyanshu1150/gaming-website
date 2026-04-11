import { MetadataRoute } from "next";
import { getAllGameSlugs, getAllCategorySlugs, getAllTagSlugs } from "@/lib/games";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const gameSlugs = getAllGameSlugs();
  const categorySlugs = getAllCategorySlugs();
  const tagSlugs = getAllTagSlugs();

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/games`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
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
