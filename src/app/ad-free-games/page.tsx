import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Ad Free Games — Play Online With No Ads",
  description:
    "Play free online games with absolutely no ads inside — no pop-ups, no video ads, no interruptions. Clean, ad-free browser games that just let you play.",
  keywords: [
    "ad free games",
    "games without ads",
    "no ad games online",
    "free games no ads",
    "online games without advertisements",
    "browser games no ads",
    "play games without ads",
    "ad free browser games",
    "games with no interruptions",
  ],
};

export default function AdFreeGamesPage() {
  const all = getAllGames();
  const adFreeGames = all.filter((g) => g.embedType === "other");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          Zero Ads Inside Games
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Ad Free Games
        </h1>
        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
          Tired of video ads interrupting your game every 2 minutes? These games have{" "}
          <strong className="text-white">absolutely no ads inside them</strong> — no pop-ups,
          no pre-rolls, no mid-game interruptions. Just pure, uninterrupted gameplay.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: "🚫", label: "No Video Ads" },
            { icon: "🚫", label: "No Pop-ups" },
            { icon: "🚫", label: "No Interruptions" },
            { icon: "✅", label: "100% Free" },
            { icon: "✅", label: "No Sign-Up" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg text-sm text-gray-200">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">
            ✓ Ad Free Games ({adFreeGames.length})
          </h2>
          <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
            More being added regularly
          </span>
        </div>
        {adFreeGames.length > 0 ? (
          <GameGrid games={adFreeGames} priorityCount={adFreeGames.length} />
        ) : (
          <p className="text-gray-400">No ad-free games found. Check back soon!</p>
        )}
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* Why ad-free */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🎮",
            title: "Uninterrupted Play",
            body: "No mid-game video ads breaking your focus. These games run cleanly from start to finish without any ad interruptions.",
          },
          {
            icon: "⚡",
            title: "Faster Loading",
            body: "Without ad SDKs and tracking scripts loading in the background, these games start faster and run more smoothly.",
          },
          {
            icon: "🔓",
            title: "Open Source",
            body: "Most ad-free games on our site are open-source projects built by developers who just want to make great games.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-white font-semibold mb-1">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-4 max-w-3xl">
        <h2 className="text-white font-bold text-xl">Why Choose Ad Free Games?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Most free browser games are supported by in-game advertising — video ads that play
          before levels, banner ads that pop up mid-game, or reward ads you have to watch to
          continue. While ads are what keep games free, they can seriously disrupt the experience,
          especially for fast-paced games where interruptions break your flow.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          Our ad-free games are open-source titles built by developers who distribute their games
          freely without any monetization. Games like <strong className="text-white">2048</strong>,{" "}
          <strong className="text-white">HexGL</strong>, and{" "}
          <strong className="text-white">Hello Wordl</strong> are classic examples — beloved,
          polished browser games with zero ads and zero tracking.
        </p>

        <h2 className="text-white font-bold text-lg">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Are these games really completely free of ads?",
              a: "Yes. Ad-free games on FreePlayArena contain no in-game advertising of any kind — no video ads, no banner ads, no reward ads. Note that FreePlayArena itself may show ads on the page around the game, but inside the game window there are none.",
            },
            {
              q: "Why are there only a few ad-free games?",
              a: "Ad-free games are open-source projects that developers release freely. There are fewer of them compared to commercially distributed games, but we add more regularly as we find quality titles.",
            },
            {
              q: "Can I suggest an ad-free game to add?",
              a: "Absolutely. If you know of a quality open-source HTML5 game that can be embedded freely, send us a link via our Contact page.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-t border-white/10 pt-4">
              <h3 className="text-white font-semibold text-sm mb-1">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross links */}
      <section>
        <h2 className="text-white font-semibold mb-4">More Game Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "😴 Games When Bored", href: "/games-to-play-when-bored" },
            { label: "⚡ No Download Games", href: "/no-download-games" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="py-3 px-4 bg-[#1a1a2e] hover:bg-[#22223b] border border-white/10 text-gray-300 hover:text-white text-sm rounded-xl transition-all text-center">
              {label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
