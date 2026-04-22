import postsData from "@/data/posts.json";
import { getAllGames } from "@/lib/games";
import type { BlogPost, EditorialPost, GuidePost } from "@/types/blog";

const EDITORIAL_POSTS = postsData.posts as EditorialPost[];

// ─── Game guide generation ────────────────────────────────────────────────────
function buildGameGuidePosts(): GuidePost[] {
  return getAllGames().map((game): GuidePost => ({
    slug: `how-to-play-${game.slug}`,
    type: "guide",
    gameSlug: game.slug,
    title: `How to Play ${game.title} — Tips, Controls & Guide`,
    metaTitle: `How to Play ${game.title} Free Online — Complete Game Guide`,
    metaDescription: `Learn how to play ${game.title} online for free. ${game.shortDescription} Full guide with controls, tips, and strategies.`,
    excerpt: `Complete guide to ${game.title}: how to get started, master the controls, and beat your high score.`,
    publishedAt: `${game.releaseYear ?? 2024}-06-01`,
    category: game.category,
    tags: [
      ...game.tags,
      "how to play",
      "game guide",
      "free online game",
      `${game.category} games`,
    ],
    featured: false,
  }));
}

// ─── Cache ────────────────────────────────────────────────────────────────────
let _allPosts: BlogPost[] | null = null;

function getAllPostsCached(): BlogPost[] {
  if (_allPosts) return _allPosts;
  const guides = buildGameGuidePosts();
  // Editorial posts first (sorted newest → oldest), then guides (sorted by plays via game data)
  const sortedEditorial = [...EDITORIAL_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  _allPosts = [...sortedEditorial, ...guides];
  return _allPosts;
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function getAllPosts(): BlogPost[] {
  return getAllPostsCached();
}

export function getEditorialPosts(): EditorialPost[] {
  return EDITORIAL_POSTS.slice().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPostsCached().find((p) => p.slug === slug);
}

export function getAllPostSlugs(): { slug: string }[] {
  return getAllPostsCached().map((p) => ({ slug: p.slug }));
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return EDITORIAL_POSTS.filter((p) => p.featured).slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPostsCached().filter((p) => p.category === category);
}

export function getPaginatedPosts(
  page: number,
  perPage = 24
): { posts: BlogPost[]; total: number; totalPages: number } {
  const all = getAllPostsCached();
  const total = all.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, total, totalPages };
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(post: BlogPost): number {
  if (post.type === "editorial") {
    const words = post.sections
      .map((s) => `${s.body} ${(s.listItems ?? []).join(" ")}`)
      .join(" ")
      .split(/\s+/).length;
    return Math.max(2, Math.ceil(words / 200));
  }
  return 3; // guides are roughly 3 min reads
}
