import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { CollectionPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Free Clicker Games Online — Play Idle & Clicking Games",
  description:
    "Play free clicker and idle games online — tap, click, and grow your score. No download, instant play in browser. The most addictive clicking games online.",
  keywords: [
    "clicker games online free",
    "idle clicker games",
    "clicking games free",
    "best clicker games browser",
    "idle games online",
    "tap games free",
    "incremental games online",
    "free idle games browser",
    "clicker games no download",
    "cookie clicker style games",
  ],
  alternates: { canonical: "https://freeplayarena.com/clicker-games" },
};

export default function ClickerGamesPage() {
  const all = getAllGames();

  // Filter: clicker, click, or idle tags
  const clickerGames = all.filter(
    (g) =>
      g.tags.includes("clicker") ||
      g.tags.includes("click") ||
      g.tags.includes("idle")
  );

  // Top rated clickers for featured section
  const topClickers = [...clickerGames]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // Fill with all games sorted by rating if we have few clicker games
  const fillGames = clickerGames.length < 6
    ? [...all]
        .filter((g) => g.category === "casual")
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12)
    : [];

  const displayGames = clickerGames.length > 0
    ? clickerGames
    : fillGames;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CollectionPageSchema
        name="Free Clicker & Idle Games Online"
        description="Best free clicker and idle games online. Cookie clicker style games, incremental games, no download."
        url="/clicker-games"
        games={topClickers}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Clicker Games", url: "/clicker-games" },
        ]}
      />
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-900/60 to-amber-900/60 border border-orange-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Click. Tap. Grow.
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Free Clicker &amp; Idle Games Online
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Play <strong className="text-white">free clicker games</strong> right in your browser —
            tap to earn, upgrade your power, and watch your numbers go up. From fast-paced active
            clickers to relaxing idle games that grow while you're away, we've got the most
            satisfying clicking experiences online. No download, no install — just click.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "🖱️ Clicker Games", href: "/tag/clicker" },
              { label: "😴 Idle Games", href: "/tag/idle" },
              { label: "🎲 Casual Games", href: "/category/casual" },
              { label: "🎮 All Games", href: "/games" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-white/10 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🖱️",
            title: "Active Clickers",
            body: "Rapid-click games where speed matters. Click as fast as you can to earn points, defeat enemies, or smash targets. Pure reflexes, pure fun.",
          },
          {
            icon: "😴",
            title: "Idle Games",
            body: "Set up your upgrades, then watch your score grow automatically. Idle games are perfect for multitasking — check back in 10 minutes and reap the rewards.",
          },
          {
            icon: "📈",
            title: "Incremental Progress",
            body: "Every click adds up. Unlock upgrades, multiply your output, and reach exponentially bigger numbers. The satisfying loop that keeps you coming back.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-2">{icon}</div>
            <h2 className="text-white font-semibold mb-1">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot slot="clicker-games-top" className="w-full" />

      {/* Top Clicker Games */}
      {topClickers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">
              🏆 Top Clicker Games
            </h2>
          </div>
          <GameGrid games={topClickers} priorityCount={8} />
        </section>
      )}

      {/* All Clicker / Idle Games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🖱️ All Clicker &amp; Idle Games{displayGames.length > 0 ? ` (${displayGames.length})` : ""}
          </h2>
          <Link href="/category/casual" className="text-orange-400 hover:text-orange-300 text-sm">
            Casual games →
          </Link>
        </div>
        {displayGames.length > 0 ? (
          <GameGrid games={displayGames} priorityCount={0} />
        ) : (
          <p className="text-gray-400 text-sm">
            Check back soon — we're adding more clicker games regularly.{" "}
            <Link href="/games" className="text-orange-400 hover:text-orange-300">
              Browse all games
            </Link>{" "}
            in the meantime.
          </p>
        )}
      </section>

      <AdSlot slot="clicker-games-mid" className="w-full" />

      {/* Idle vs Active explainer */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">Idle vs Active Clicker Games — What's the Difference?</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <h3 className="text-orange-400 font-semibold">Active Clicker Games</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              In active clicker games, you need to keep clicking to progress. The faster and more
              accurately you click, the better your score. These games reward attention and reflexes —
              perfect for short, intense sessions. They feel arcade-like and give immediate satisfaction
              with every tap.
            </p>
            <ul className="space-y-1 text-gray-400 text-sm">
              {[
                "Immediate feedback on every click",
                "High-score competitions",
                "Great for 5-minute sessions",
                "Tests speed and accuracy",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-orange-400 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-amber-400 font-semibold">Idle / Incremental Games</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Idle games (also called incremental games) keep progressing even when you're not
              actively playing. You set up upgrades and automated systems, then check back to
              collect resources and unlock the next tier. The satisfying sense of growing numbers
              makes them highly addictive and great for casual play throughout the day.
            </p>
            <ul className="space-y-1 text-gray-400 text-sm">
              {[
                "Progress even while idle",
                "Deep upgrade systems",
                "Perfect for multitasking",
                "Long-term progression rewards",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber-400 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-white font-bold text-lg">Why Are Clicker Games So Addictive?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Clicker games tap into a core reward mechanism in the human brain: variable ratio
          reinforcement. Every click has a chance of triggering an upgrade, a milestone, or
          a satisfying visual effect. This is the same psychological loop behind slot machines
          and social media likes — but in a fun, harmless game format. The numbers going up
          never stops feeling satisfying, no matter how big they get.
        </p>

        {/* Cross-links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            { label: "🎲 Casual Games", href: "/category/casual" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "🏫 School Games", href: "/school-games" },
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🧠 Brain Games", href: "/brain-games" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
        {[
          {
            q: "What are clicker games?",
            a: "Clicker games (also called incremental games or idle games) are games where clicking is the core mechanic. You click to earn currency, spend it on upgrades, and progress toward larger goals. They range from fast-paced active clickers to slow-burn idle games.",
          },
          {
            q: "Do idle games work while the tab is closed?",
            a: "Browser-based idle games typically calculate offline progress when you return to the tab, simulating what happened while you were away. The exact behavior depends on each game's implementation.",
          },
          {
            q: "Are clicker games free to play?",
            a: "Yes — all games on FreePlayArena are completely free. No in-game purchases, no premium upgrades to buy, no paywalls. The site is supported by ads.",
          },
          {
            q: "Do clicker games work on mobile?",
            a: "Yes. Clicker and idle games are particularly well-suited for mobile — tapping on a touchscreen is more natural than clicking. All our games work on iOS Safari and Android Chrome.",
          },
        ].map(({ q, a }) => (
          <div key={q} className="bg-[#1a1a2e] rounded-xl p-5">
            <h3 className="text-white font-semibold mb-2 text-sm">{q}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
