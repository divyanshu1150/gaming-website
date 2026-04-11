import Link from "next/link";
import { getFeaturedGames, getPopularGames } from "@/lib/games";
import { CATEGORIES } from "@/lib/categories";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import HeroBanner from "@/components/home/HeroBanner";

export default function HomePage() {
  const featured = getFeaturedGames(6);
  const popular = getPopularGames(10);
  const heroGame = featured[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero banner */}
      {heroGame && <HeroBanner game={heroGame} />}

      {/* Ad banner */}
      <div className="flex justify-center">
        <AdSlot format="banner" className="max-w-3xl w-full" />
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">Browse by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-[#1a1a2e] hover:bg-[#22223b] rounded-xl p-4 transition-colors group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-gray-300 group-hover:text-white text-xs font-medium text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">⭐ Featured Games</h2>
          <Link href="/games?featured=true" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={featured} priorityCount={6} />
      </section>

      {/* Ad banner mid */}
      <div className="flex justify-center">
        <AdSlot format="banner" className="max-w-3xl w-full" />
      </div>

      {/* Popular games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">🔥 Most Popular</h2>
          <Link href="/games?sort=popular" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={popular} priorityCount={0} />
      </section>
    </div>
  );
}
