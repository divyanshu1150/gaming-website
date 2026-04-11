"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game";

interface RecentlyPlayedProps {
  allGames: Game[];
}

export default function RecentlyPlayed({ allGames }: RecentlyPlayedProps) {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(localStorage.getItem("recently_played") ?? "[]");
      const found = slugs
        .map((slug) => allGames.find((g) => g.slug === slug))
        .filter(Boolean) as Game[];
      setGames(found);
    } catch {
      // localStorage unavailable
    }
  }, [allGames]);

  if (games.length === 0) return null;

  return (
    <section>
      <h2 className="text-white font-bold text-xl mb-5">🕹️ Recently Played</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="group shrink-0 w-36 bg-[#1a1a2e] rounded-xl overflow-hidden hover:bg-[#22223b] transition-colors"
          >
            <div className="relative aspect-video bg-[#111]">
              <Image
                src={game.thumbnail}
                alt={game.thumbnailAlt}
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
            <p className="text-white text-xs font-medium truncate px-2 py-1.5 group-hover:text-violet-300">
              {game.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
