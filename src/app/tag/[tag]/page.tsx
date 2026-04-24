import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGamesByTag, getAllTagSlugs, getAllTags } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTagSlugs();
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const games = getGamesByTag(tag);
  if (games.length === 0) return {};

  return {
    title: `Free ${tag.charAt(0).toUpperCase() + tag.slice(1)} Games Online — Play Instantly, No Download`,
    description: `Play ${games.length} free online ${tag} game${games.length !== 1 ? "s" : ""} instantly in your browser — no download, no sign-up required. Works on any device.`,
    keywords: [tag, `${tag} games`, "free online games", "browser games", "html5 games"],
    // Noindex tags with only 1-2 games — thin content
    robots: games.length < 3 ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: `https://freeplayarena.com/tag/${tag}` },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const games = getGamesByTag(tag);
  if (games.length === 0) notFound();

  // Related tags — pull from games that share this tag
  const relatedTagSet = new Set<string>();
  games.forEach((g) => g.tags.forEach((t) => { if (t !== tag) relatedTagSet.add(t); }));
  const relatedTags = [...relatedTagSet].slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-violet-400">Home</Link>
        <span>/</span>
        <Link href="/games" className="hover:text-violet-400">Games</Link>
        <span>/</span>
        <span className="text-gray-400">#{tag}</span>
      </nav>

      {/* Header */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6">
        <h1 className="text-white font-bold text-2xl mb-2">
          <span className="text-violet-400">#</span>{tag} Games
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Browse {games.length} free online <strong className="text-white">{tag}</strong> game{games.length !== 1 ? "s" : ""} —
          all playable instantly in your browser without any downloads or sign-ups.
        </p>
      </div>

      <AdSlot format="banner" className="w-full" />

      <GameGrid games={games} priorityCount={8} />

      {/* Related tags */}
      {relatedTags.length > 0 && (
        <div>
          <h2 className="text-white font-semibold mb-3 text-sm">Related Tags</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((t) => (
              <Link
                key={t}
                href={`/tag/${t}`}
                className="px-3 py-1 bg-white/10 hover:bg-violet-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
