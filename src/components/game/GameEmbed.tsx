"use client";

import { useRef, useState, useEffect } from "react";
import { Game } from "@/types/game";

interface GameEmbedProps {
  game: Game;
}

function getSandbox(embedType: Game["embedType"]): string | undefined {
  if (embedType === "self-hosted") return undefined;
  return "allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-orientation-lock";
}

function saveRecentlyPlayed(slug: string) {
  try {
    const key = "recently_played";
    const existing: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
    const updated = [slug, ...existing.filter((s) => s !== slug)].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch {}
}

function incrementPlayCount(slug: string) {
  try {
    const key = `plays_${slug}`;
    const current = parseInt(localStorage.getItem(key) ?? "0", 10);
    localStorage.setItem(key, String((isNaN(current) ? 0 : current) + 1));
  } catch {}
}

function getEmbedUrl(game: Game): string {
  if (game.embedType !== "gamedistribution") return game.embedUrl;
  const base = game.embedUrl.replace(/\?.*$/, "").replace(/\/$/, "") + "/";
  const referrer = "https://freeplayarena.com/games/" + game.slug + "/";
  return base + "?gd_sdk_referrer_url=" + encodeURIComponent(referrer);
}

export default function GameEmbed({ game }: GameEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setTimedOut(true);
    }, 12000);
    return () => clearTimeout(t);
  }, [loaded]);

  function handleLoad() {
    setLoaded(true);
    saveRecentlyPlayed(game.slug);
    incrementPlayCount(game.slug);
  }

  function handleFullscreen() {
    const el = iframeRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
  }

  const sandboxAttr = getSandbox(game.embedType);
  const paddingBottom =
    game.aspectRatio === "16/9" ? "56.25%" :
    game.aspectRatio === "4/3" ? "75%" : "100%";

  return (
    <div className="w-full">
      <div
        className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl"
        style={{ paddingBottom }}
      >
        {/* Loading spinner */}
        {!loaded && !timedOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0f1a] z-10">
            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-400 text-sm">Loading {game.title}...</p>
          </div>
        )}

        {/* Timeout / embed not configured */}
        {timedOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0f1a] z-10 text-center px-6">
            <span className="text-5xl mb-4">🎮</span>
            <h3 className="text-white font-bold text-lg mb-2">Game Not Available</h3>
            <p className="text-gray-400 text-sm mb-4 max-w-sm">
              This game embed failed to load. The publisher may have restricted access.
            </p>
            <a
              href="/games"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors"
            >
              Browse Other Games
            </a>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={getEmbedUrl(game)}
          title={game.title}
          className="absolute inset-0 w-full h-full border-0"
          onLoad={handleLoad}
          allow="autoplay; fullscreen; pointer-lock"
          {...(sandboxAttr ? { sandbox: sandboxAttr } : {})}
        />
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-gray-500 text-xs">
          {game.embedType === "self-hosted" ? "Open Source Game" : `via ${game.source}`}
        </span>
        <button
          onClick={handleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-violet-600 text-white text-xs rounded-lg transition-colors"
        >
          ⛶ Fullscreen
        </button>
      </div>
    </div>
  );
}
