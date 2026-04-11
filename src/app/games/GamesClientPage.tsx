"use client";

import { useCallback, useMemo, useState } from "react";
import { Game } from "@/types/game";
import { searchGames } from "@/lib/search";
import { CATEGORIES } from "@/lib/categories";
import GameGrid from "@/components/game/GameGrid";
import SearchBar from "@/components/search/SearchBar";
import CategoryNav from "@/components/category/CategoryNav";
import AdSlot from "@/components/ads/AdSlot";

interface GamesClientPageProps {
  games: Game[];
  initialQuery?: string;
}

export default function GamesClientPage({ games, initialQuery = "" }: GamesClientPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    let result = games;
    if (activeCategory !== "all") {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (query.trim()) {
      result = searchGames(result, query);
    }
    return result;
  }, [games, query, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchBar initialQuery={initialQuery} onSearch={handleSearch} />
        <p className="text-gray-400 text-sm shrink-0">
          {filtered.length} game{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-violet-600 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
          }`}
        >
          🎮 All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-violet-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <AdSlot format="banner" className="w-full" />

      <GameGrid
        games={filtered}
        emptyMessage={`No games found${query ? ` for "${query}"` : ""}.`}
        priorityCount={8}
      />
    </div>
  );
}
