import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getPostBySlug,
  getAllPostSlugs,
  formatDate,
  estimateReadTime,
  getPostsByCategory,
} from "@/lib/blog";
import { getGameBySlug } from "@/lib/games";
import ArticleSchema from "@/components/blog/ArticleSchema";
import PostCard from "@/components/blog/PostCard";
import AdSlot from "@/components/ads/AdSlot";
import GameCard from "@/components/game/GameCard";
import type { BlogSection } from "@/types/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

// ─── Category-specific tips ───────────────────────────────────────────────────
const CATEGORY_TIPS: Record<string, string[]> = {
  action: [
    "Keep moving — standing still makes you an easy target.",
    "Learn the attack patterns of enemies before committing to aggressive play.",
    "Prioritise the most dangerous enemies first, not the nearest ones.",
    "Use the environment for cover and positioning advantages.",
    "Master one weapon or mechanic fully before trying to diversify.",
  ],
  puzzle: [
    "Read the full level layout before making your first move.",
    "Work backwards from the goal state to understand what you need.",
    "If you are stuck, restart and observe what went wrong — restarts teach more than fumbling.",
    "Look for moves that open up multiple options, not just solve the immediate problem.",
    "Patience pays off — most puzzles have a clean, elegant solution waiting to be found.",
  ],
  racing: [
    "Brake before corners, not during them — carry speed through the apex.",
    "Learn the track layout by watching a full lap before racing at full speed.",
    "Stay on the racing line — the optimal path is usually the widest arc through corners.",
    "In obstacle-dodge racers, focus on the gap, not the obstacles.",
    "Consistent laps beat risky overtakes — finish the race first.",
  ],
  casual: [
    "Start slow and learn the rhythm before pushing for high scores.",
    "Focus on survival first — points and combos come naturally once you are safe.",
    "Each run teaches something — treat early failures as practice.",
    "Many casual games have a 'flow state' difficulty — find the pace that keeps you engaged.",
    "Take short breaks between sessions to reset your reaction times.",
  ],
  sports: [
    "Master the core mechanic — timing, aiming, or positioning — before worrying about advanced techniques.",
    "Observe the opponent's patterns in AI-controlled games to predict their moves.",
    "Consistent execution beats flashy tricks in most sports games.",
    "Practice the hardest shots or moves in low-pressure situations first.",
  ],
  adventure: [
    "Explore thoroughly — most adventure games reward curiosity with hidden items or shortcuts.",
    "Pay attention to environmental storytelling — the world tells you where to go.",
    "Conserve resources early and spend them strategically in difficult sections.",
    "Check every path, even ones that seem blocked — many have alternative routes.",
  ],
};

function getGameTips(category: string): string[] {
  return (
    CATEGORY_TIPS[category] ?? [
      "Play a few rounds to understand the core mechanic before pushing for high scores.",
      "Stay patient — most games reward consistency over reckless play.",
      "Observe patterns in obstacles or enemies and adapt your strategy.",
      "Take short breaks between sessions to stay sharp.",
      "Experiment with different approaches — there is usually more than one valid strategy.",
    ]
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const game = post.type === "guide" ? getGameBySlug(post.gameSlug) : undefined;
  const readTime = estimateReadTime(post);
  const related = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 6);

  return (
    <>
      <ArticleSchema post={post} game={game} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-violet-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-semibold bg-violet-600/20 text-violet-400 rounded-full">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="text-gray-500 text-sm">{formatDate(post.publishedAt)}</span>
            <span className="text-gray-500 text-sm">· {readTime} min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">{post.excerpt}</p>
        </header>

        {/* ── GUIDE layout ─────────────────────────────────────────────── */}
        {post.type === "guide" && game && (
          <>
            {/* Game thumbnail + quick facts */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8 p-5 bg-[#1a1a2e] rounded-xl border border-white/10">
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square rounded-lg overflow-hidden shrink-0">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <h2 className="text-white font-bold text-xl">{game.title}</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-200 capitalize">{game.category}</span>
                  <span className="text-gray-500">Developer</span>
                  <span className="text-gray-200">{game.developer}</span>
                  <span className="text-gray-500">Rating</span>
                  <span className="text-gray-200">⭐ {game.rating}/5</span>
                  <span className="text-gray-500">Price</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <Link
                  href={`/games/${game.slug}`}
                  className="mt-3 self-start px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  ▶ Play {game.title} Free
                </Link>
              </div>
            </div>

            <AdSlot slot="blog-guide-top" className="mb-8" />

            {/* About */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">About {game.title}</h2>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </section>

            {/* Controls */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Controls & How to Play</h2>
              <div className="p-4 bg-[#1a1a2e] border border-white/10 rounded-xl mb-4">
                <p className="text-gray-200 font-medium">🎮 {game.instructions}</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {game.title} is a free online {game.category} game that you can play instantly in your
                browser — no download or account required. Use the controls above to get started, and
                give yourself a few rounds to get comfortable with the mechanics before pushing for
                high scores.
              </p>
            </section>

            {/* Tips */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Tips & Strategies for {game.title}
              </h2>
              <ul className="space-y-3">
                {getGameTips(game.category).map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-violet-600/30 text-violet-400 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <div className="my-10 p-6 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/30 rounded-2xl text-center">
              <p className="text-white font-bold text-xl mb-2">Ready to play?</p>
              <p className="text-gray-400 mb-4">
                {game.title} is free — no download, no sign-up, just instant fun.
              </p>
              <Link
                href={`/games/${game.slug}`}
                className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-colors text-lg"
              >
                ▶ Play {game.title} Now
              </Link>
            </div>

            {/* Related games in same category */}
            {game.relatedSlugs && game.relatedSlugs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  More {game.category.charAt(0).toUpperCase() + game.category.slice(1)} Games
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {game.relatedSlugs.map((relSlug) => {
                    const relGame = getGameBySlug(relSlug);
                    if (!relGame) return null;
                    return <GameCard key={relGame.slug} game={relGame} />;
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* ── EDITORIAL layout ──────────────────────────────────────────── */}
        {post.type === "editorial" && (
          <article className="prose prose-invert prose-violet max-w-none">
            {post.sections.map((section: BlogSection, i: number) => {
              const sectionGames = (section.gameSlugs ?? [])
                .map((s) => getGameBySlug(s))
                .filter(Boolean);

              return (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-white mb-3">{section.heading}</h2>
                  )}
                  <p className="text-gray-300 leading-relaxed mb-3">{section.body}</p>
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="space-y-1.5 mb-4">
                      {section.listItems.map((item, j) => (
                        <li key={j} className="flex gap-2 text-gray-300">
                          <span className="text-violet-400 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {sectionGames.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                      {sectionGames.map((g) => g && <GameCard key={g.slug} game={g} />)}
                    </div>
                  )}
                  {i === 0 && <AdSlot slot={`blog-editorial-mid-${i}`} className="mt-6" />}
                </div>
              );
            })}
          </article>
        )}

        <AdSlot slot="blog-bottom" className="mt-8 mb-8" />

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">More{" "}
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel) => {
                const relGame = rel.type === "guide" ? getGameBySlug(rel.gameSlug) : undefined;
                return <PostCard key={rel.slug} post={rel} game={relGame} />;
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
