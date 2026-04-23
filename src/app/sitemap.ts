import { MetadataRoute } from "next";
import { getAllGameSlugs, getAllCategorySlugs, getAllTagSlugs } from "@/lib/games";
import { getAllPostSlugs } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const gameSlugs = getAllGameSlugs();
  const categorySlugs = getAllCategorySlugs();
  const tagSlugs = getAllTagSlugs();
  const postSlugs = getAllPostSlugs();

  // Static pages — manually maintained
  const staticPages = [
    { url: BASE_URL,                                    priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/games`,                         priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/blog`,                          priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/unblocked-games`,               priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/ad-free-games`,                 priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/puzzle-games`,                  priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/no-download-games`,             priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/games-to-play-when-bored`,      priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/school-games`,                  priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/html5-games`,                   priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/classic-games`,                 priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/clicker-games`,                 priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/brain-games`,                   priority: 0.8, changeFrequency: "weekly" as const },
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
    ...postSlugs.map(({ slug }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug.startsWith("how-to-play-") ? 0.6 : 0.75,
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
