import type { Metadata } from "next";
import Link from "next/link";
import { getPaginatedPosts, getFeaturedPosts } from "@/lib/blog";
import { getGameBySlug } from "@/lib/games";
import PostCard from "@/components/blog/PostCard";
import AdSlot from "@/components/ads/AdSlot";

export const revalidate = 86400;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export const metadata: Metadata = {
  title: "Game Guides, Tips & Articles | FreePlayArena Blog",
  description:
    "Game guides, tips, and articles for free online games. How-to-play guides for 350+ games, best-of roundups, and strategy advice — all free.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Game Guides & Articles | FreePlayArena Blog",
    description:
      "Tips, guides, and best-of roundups for hundreds of free online games.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const CATEGORIES = [
  { slug: "all", label: "All Posts" },
  { slug: "roundups", label: "Roundups" },
  { slug: "guides", label: "Guides" },
  { slug: "action", label: "Action" },
  { slug: "puzzle", label: "Puzzle" },
  { slug: "casual", label: "Casual" },
  { slug: "racing", label: "Racing" },
  { slug: "sports", label: "Sports" },
  { slug: "adventure", label: "Adventure" },
];

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const perPage = 24;

  const { posts, totalPages } = getPaginatedPosts(page, perPage);
  const featured = getFeaturedPosts(3);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Game Guides & Articles</h1>
        <p className="text-gray-400">
          How-to-play guides, tips, and best-of roundups for free online games.
        </p>
      </div>

      {/* Featured editorial posts */}
      {page === 1 && featured.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((post) => {
              const game =
                post.type === "guide" ? getGameBySlug(post.gameSlug) : undefined;
              return <PostCard key={post.slug} post={post} game={game} />;
            })}
          </div>
        </section>
      )}

      <AdSlot slot="blog-banner" className="mb-8" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === "all" ? "/blog" : `/blog?category=${cat.slug}`}
            className="px-3 py-1.5 text-sm rounded-full bg-white/10 text-gray-300 hover:bg-violet-600 hover:text-white transition-colors"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* All posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {posts.map((post) => {
          const game =
            post.type === "guide" ? getGameBySlug(post.gameSlug) : undefined;
          return <PostCard key={post.slug} post={post} game={game} />;
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}`}
              className="px-4 py-2 bg-white/10 hover:bg-violet-600 text-white text-sm rounded-lg transition-colors"
            >
              ← Previous
            </Link>
          )}
          <span className="text-gray-400 text-sm px-4">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/blog?page=${page + 1}`}
              className="px-4 py-2 bg-white/10 hover:bg-violet-600 text-white text-sm rounded-lg transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
