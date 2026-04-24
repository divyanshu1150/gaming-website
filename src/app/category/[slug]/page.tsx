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
    title: `Free ${category.name} Games Online — Play Instantly, No Download`,
    description: `Play the best free online ${category.name.toLowerCase()} games at FreePlayArena. ${category.description}. No download or sign-up required.`,
    keywords: [
      `${category.name.toLowerCase()} games`,
      `free ${category.name.toLowerCase()} games`,
      `online ${category.name.toLowerCase()} games`,
      "browser games",
      "html5 games",
      "no download",
    ],
    alternates: { canonical: `https://freeplayarena.com/category/${slug}` },
  };
}

const CATEGORY_CONTENT: Record<string, { intro: string; tips: string }> = {
  action: {
    intro:
      "Action games put your reflexes and quick thinking to the ultimate test. From stickman brawlers to epic shooters and platform runners, our action game collection delivers non-stop excitement. Jump in, dodge hazards, defeat enemies, and push your skills to the limit.",
    tips:
      "Master the controls before tackling hard levels. Most action games reward precision over speed — learn enemy patterns and attack windows rather than button-mashing your way through.",
  },
  puzzle: {
    intro:
      "Puzzle games challenge your brain with logic, pattern recognition, and creative problem-solving. Whether you love matching tiles, sliding blocks, number challenges, or physics-based puzzles, you'll find hours of satisfying gameplay here — completely free.",
    tips:
      "Take your time. Rushing puzzles leads to mistakes. Look at the full board before making a move, and work backwards from the goal state when you feel stuck.",
  },
  racing: {
    intro:
      "Feel the rush of speed with our free online racing games. Choose from realistic car simulators, drift challenges, motorbike racers, and wild stunt tracks — all playable instantly in your browser without any downloads.",
    tips:
      "Smooth steering beats aggressive braking every time. Learn track layouts on your first run and save overtaking for long straights. In drift games, counter-steer early to maintain control.",
  },
  sports: {
    intro:
      "Compete in your favourite sports without leaving your browser. FreePlayArena's sports games cover football, basketball, tennis, golf, boxing, pool, and more — from quick casual rounds to deep competitive matches.",
    tips:
      "Timing is everything in sports games. Watch movement cycles and wind indicators carefully before acting. For multiplayer sports, positioning beats raw power.",
  },
  adventure: {
    intro:
      "Embark on epic journeys with our free adventure games. Explore hidden dungeons, solve environmental puzzles, rescue characters, and uncover secrets across rich worlds built for browser play. No installation needed — just click and explore.",
    tips:
      "Explore every corner of each level — collectables and shortcuts are often hidden off the main path. Interact with every object; adventure games reward curiosity.",
  },
  casual: {
    intro:
      "Casual games are designed to be easy to pick up and hard to put down. Perfect for a quick break or a long session, our casual collection includes idle games, match-3 puzzles, clicker games, and simple but addictive challenges for all ages.",
    tips:
      "Don't overlook upgrades and progression systems in casual games — a small investment early often pays dividends later. Set personal score targets to keep each session engaging.",
  },
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const games = getGamesByCategory(slug);
  const content = CATEGORY_CONTENT[slug];
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Category header */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{category.icon}</span>
          <div>
            <h1 className="text-white font-bold text-2xl sm:text-3xl">
              Free {category.name} Games
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {games.length} game{games.length !== 1 ? "s" : ""} — play free online, no download required
            </p>
          </div>
        </div>

        {content && (
          <p className="text-gray-300 text-sm leading-relaxed">{content.intro}</p>
        )}
      </div>

      {/* Category nav */}
      <CategoryNav />

      <AdSlot format="banner" className="w-full" />

      <GameGrid
        games={games}
        emptyMessage={`No ${category.name.toLowerCase()} games yet. Check back soon!`}
        priorityCount={8}
      />

      {/* Tips section */}
      {content && (
        <div className="bg-[#1a1a2e] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-2">
            Tips for {category.name} Games
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">{content.tips}</p>
        </div>
      )}

      {/* Other categories */}
      <div>
        <h2 className="text-white font-semibold mb-4">Explore Other Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {otherCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-[#1a1a2e] hover:bg-[#22223b] rounded-xl p-4 transition-colors group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-gray-300 group-hover:text-white text-xs font-medium text-center">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
