"use client";

import { useState } from "react";

interface GameThumbnailProps {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
}

export default function GameThumbnail({ src, alt, title }: GameThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-900/60 to-[#0f0f1a]">
        <span className="text-4xl mb-2">🎮</span>
        <span className="text-gray-300 text-xs font-medium text-center px-2 line-clamp-2">{title}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  );
}
