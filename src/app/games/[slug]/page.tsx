import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGameBySlug, getAllGameSlugs, getRelatedGames } from "@/lib/games";
import GameEmbed from "@/components/game/GameEmbed";
import RelatedGames from "@/components/game/RelatedGames";
import AdSlot from "@/components/ads/AdSlot";
import GameSchema from "@/components/game/GameSchema";
import ShareButton from "@/components/game/ShareButton";
import PlayCount from "@/components/game/PlayCount";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

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

  const pageUrl = `${BASE_URL}/games/${slug}`;
  const thumbUrl = `${BASE_URL}${game.thumbnail}`;

  return {
    title: `${game.title} — Play Free Online`,
    description: `Play ${game.title} free online — no download required. ${game.shortDescription}. ${game.instructions}`,
    keywords: [game.title, ...game.tags, game.category, "free online game", "play free"],
    openGraph: {
      title: `Play ${game.title} Free Online`,
      description: game.shortDescription,
      url: pageUrl,
      images: [{ url: thumbUrl, width: 512, height: 512, alt: game.thumbnailAlt }],
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = getRelatedGames(game.relatedSlugs);
  const pageUrl = `${BASE_URL}/games/${slug}`;
  const thumbUrl = `${BASE_URL}${game.thumbnail}`;

  return (
    <>
      <GameSchema game={game} url={pageUrl} thumbnailUrl={thumbUrl} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <span>/</span>
          <Link href="/games" className="hover:text-violet-400">Games</Link>
          <span>/</span>
          <Link href={`/category/${game.category}`} className="hover:text-violet-400 capitalize">{game.category}</Link>
          <span>/</span>
          <span className="text-gray-400">{game.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          {/* Main column */}
          <div className="space-y-6">
            {/* Game embed */}
            <GameEmbed game={game} />

            {/* Game info */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-white font-bold text-2xl">{game.title}</h1>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <Link href={`/category/${game.category}`} className="text-violet-400 text-sm capitalize hover:text-violet-300">
                      {game.category}
                    </Link>
                    <span className="text-gray-500 text-sm">by {game.developer}</span>
                    <span className="text-gray-500 text-sm">{game.releaseYear}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">★ {game.rating.toFixed(1)}</div>
                    <PlayCount slug={game.slug} basePlays={game.plays} />
                  </div>
                  <ShareButton title={game.title} url={pageUrl} />
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{game.description}</p>

              {/* Clickable tags */}
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-white/10 hover:bg-violet-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
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
    </>
  );
}
