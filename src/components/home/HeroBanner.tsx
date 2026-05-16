"use client";

import Link from "next/link";
import { useState } from "react";
import { Game } from "@/types/game";

interface HeroBannerProps {
  game: Game;
}

export default function HeroBanner({ game }: HeroBannerProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] min-h-[260px] flex items-end">
      <div className="absolute inset-0">
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={game.thumbnail}
            alt={game.thumbnailAlt}
            width={1200}
            height={400}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/60 to-transparent" />
      </div>
      <div className="relative z-10 p-8 max-w-lg">
        <span className="inline-block bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
          ⭐ Featured
        </span>
        <h1 className="text-white text-3xl font-bold mb-2">{game.title}</h1>
        <p className="text-gray-300 text-sm mb-5 line-clamp-2">
          {game.shortDescription}
        </p>
        <Link
          href={`/games/${game.slug}`}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          ▶ Play Now
        </Link>
      </div>
    </section>
  );
}
