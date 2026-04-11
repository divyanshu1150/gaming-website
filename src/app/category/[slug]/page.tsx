import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGamesByCategory, getAllCategorySlugs } from "@/lib/games";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import GameGrid from "@/components/game/GameGrid";
import CategoryNav from "@/components/category/CategoryNav";
import AdSlot from "@/components/ads/AdSlot";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs();
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} Games`,
    description: `Play free online ${category.name.toLowerCase()} games. ${category.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const games = getGamesByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Category header */}
      <div className="flex items-center gap-4">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-white font-bold text-2xl">{category.name} Games</h1>
          <p className="text-gray-400 text-sm mt-1">{category.description}</p>
        </div>
      </div>

      {/* Category nav */}
      <CategoryNav />

      <AdSlot format="banner" className="w-full" />

      <GameGrid
        games={games}
        emptyMessage={`No ${category.name.toLowerCase()} games yet. Check back soon!`}
        priorityCount={8}
      />
    </div>
  );
}
