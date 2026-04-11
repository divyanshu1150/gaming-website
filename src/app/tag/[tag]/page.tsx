import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGamesByTag, getAllTagSlugs } from "@/lib/games";
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
    title: `#${tag} Games — Play Free Online`,
    description: `Play free online ${tag} games — ${games.length} games tagged with #${tag}. No download required.`,
    keywords: [tag, `${tag} games`, "free online games", "browser games"],
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const games = getGamesByTag(tag);
  if (games.length === 0) notFound();

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
      <div>
        <h1 className="text-white font-bold text-2xl">
          <span className="text-violet-400">#</span>{tag} Games
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {games.length} free online {tag} game{games.length !== 1 ? "s" : ""} — play instantly, no download needed.
        </p>
      </div>

      <AdSlot format="banner" className="w-full" />

      <GameGrid games={games} priorityCount={8} />
    </div>
  );
}
