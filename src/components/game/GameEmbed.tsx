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
  if (game.embedType === "gamedistribution") {
    const base = game.embedUrl.replace(/\?.*$/, "").replace(/\/$/, "") + "/";
    const referrer = "https://freeplayarena.com/games/" + game.slug + "/";
    return base + "?gd_sdk_referrer_url=" + encodeURIComponent(referrer);
  }
  return game.embedUrl;
}

export default function GameEmbed({ game }: GameEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Only start timeout after user clicks play
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      if (!loaded) setTimedOut(true);
    }, 15000);
    return () => clearTimeout(t);
  }, [started, loaded]);

  function handlePlay() {
    setStarted(true);
    saveRecentlyPlayed(game.slug);
    incrementPlayCount(game.slug);
  }

  function handleLoad() {
    setLoaded(true);
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
        {/* Click-to-play screen — shown before user starts */}
        {!started && (
          <div className="absolute inset-0 z-20">
            {/* Blurred thumbnail background */}
            {!imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={game.thumbnail}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-[#1a1a2e]" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
              <button
                onClick={handlePlay}
                className="group flex items-center justify-center w-20 h-20 rounded-full bg-violet-600 hover:bg-violet-500 hover:scale-110 transition-all duration-200 shadow-2xl shadow-violet-900/50"
                aria-label={`Play ${game.title}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 text-white ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="text-center">
                <p className="text-white font-bold text-lg drop-shadow">{game.title}</p>
                <p className="text-gray-300 text-sm mt-1">Click to Play</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading spinner — after click, before iframe ready */}
        {started && !loaded && !timedOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0f1a] z-10">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-400 text-sm">Loading {game.title}...</p>
          </div>
        )}

        {/* Timeout fallback */}
        {timedOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0f1a] z-10 text-center px-6">
            <span className="text-5xl mb-4">🎮</span>
            <h3 className="text-white font-bold text-lg mb-2">Game Not Available</h3>
            <p className="text-gray-400 text-sm mb-4 max-w-sm">
              This game failed to load. Try refreshing or browse other games.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setTimedOut(false); setLoaded(false); setStarted(false); }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
              >
                Try Again
              </button>
              <a
                href="/games"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors"
              >
                Browse Games
              </a>
            </div>
          </div>
        )}

        {/* Iframe — only mounted after click */}
        {started && (
          <iframe
            ref={iframeRef}
            src={getEmbedUrl(game)}
            title={game.title}
            className="absolute inset-0 w-full h-full border-0"
            onLoad={handleLoad}
            allow="autoplay; fullscreen; pointer-lock"
            {...(sandboxAttr ? { sandbox: sandboxAttr } : {})}
          />
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-gray-500 text-xs">
          {game.embedType === "self-hosted" ? "Open Source Game" : `via ${game.source}`}
        </span>
        {started && (
          <button
            onClick={handleFullscreen}
            aria-label="Enter fullscreen"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-violet-600 text-white text-xs rounded-lg transition-colors"
          >
            ⛶ Fullscreen
          </button>
        )}
      </div>
    </div>
  );
}
