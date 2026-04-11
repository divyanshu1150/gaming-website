import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getAllGameSlugs, getRelatedGames } from "@/lib/games";
import GameEmbed from "@/components/game/GameEmbed";
import RelatedGames from "@/components/game/RelatedGames";
import AdSlot from "@/components/ads/AdSlot";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGameSlugs();
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: `${game.title} — Play Free Online`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.shortDescription,
      images: [game.thumbnail],
    },
  };
}

function formatPlays(plays: number): string {
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K`;
  return plays.toString();
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = getRelatedGames(game.relatedSlugs);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
        {/* Main column */}
        <div className="space-y-6">
          {/* Game embed */}
          <GameEmbed game={game} />

          {/* Game info */}
          <div className="bg-[#1a1a2e] rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white font-bold text-2xl">{game.title}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-violet-400 text-sm capitalize">{game.category}</span>
                  <span className="text-gray-500 text-sm">by {game.developer}</span>
                  <span className="text-gray-500 text-sm">{game.releaseYear}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-yellow-400 font-bold">★ {game.rating.toFixed(1)}</div>
                <div className="text-gray-400 text-xs mt-0.5">{formatPlays(game.plays)} plays</div>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">{game.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Instructions */}
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-white font-semibold text-sm mb-1">How to Play</h3>
              <p className="text-gray-400 text-sm">{game.instructions}</p>
            </div>
          </div>

          {/* Ad below game info */}
          <AdSlot format="banner" className="w-full" />

          {/* Related games */}
          <RelatedGames games={related} />
        </div>

        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col gap-4 mt-0">
          <AdSlot format="rectangle" />
          <AdSlot format="sidebar" />
        </aside>
      </div>
    </div>
  );
}
