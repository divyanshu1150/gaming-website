import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { CollectionPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Free Games for Kids — Safe, Fun Browser Games With No Download",
  description:
    "Safe, fun, and free online games for kids — no download, no account, no ads. Play kid-friendly browser games instantly, including puzzles, animals, coloring, and casual games.",
  keywords: [
    "free games for kids",
    "kids games online free",
    "online games for children",
    "safe games for kids",
    "browser games for kids",
    "fun games for kids free",
    "free kids games no download",
    "games for children online",
    "educational games for kids",
    "kids free online games",
  ],
  alternates: { canonical: "https://freeplayarena.com/free-games-for-kids" },
  openGraph: {
    title: "Free Games for Kids — Safe Browser Games",
    description:
      "Safe, fun free online games for kids — puzzles, animals, coloring, and casual games. No download, no sign-up.",
    url: "https://freeplayarena.com/free-games-for-kids",
    type: "website",
  },
};

const KIDS_TAGS = ["kid", "kids", "children", "child", "family", "cute", "cartoon", "boy", "girl", "animal", "animals", "baby"];
const KIDS_SLUGS = [
  "bamboo-panda",
  "panda-adventure",
  "duck-dash-pro",
  "finding-redpanda",
  "zoologic",
  "dotanimals",
  "number-bee",
  "sugar-smash",
  "easy-easter-coloring-eggs",
  "boat-bear",
  "kiwi-adventure-game",
  "bubble-blast",
  "color-pop-mania",
  "minecraft-flappy-creeper",
  "2048-classic",
  "snake-advanced",
  "sudoku-classic",
  "minesweeper-pro",
  "tetris-classic",
  "simon-game-web",
];

const AGE_GROUPS = [
  { label: "🎨 Coloring & Art", href: "/tag/coloring" },
  { label: "🐾 Animal Games", href: "/tag/animals" },
  { label: "🧩 Puzzles", href: "/category/puzzle" },
  { label: "🏃 Running Games", href: "/tag/run" },
  { label: "🎮 Casual Fun", href: "/category/casual" },
  { label: "🧠 Brain Games", href: "/brain-games" },
];

export default function FreeGamesForKidsPage() {
  const allGames = getAllGames();

  const curatedGames = KIDS_SLUGS
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter(Boolean) as typeof allGames;

  const curatedSlugs = new Set(curatedGames.map((g) => g.slug));

  const tagGames = allGames.filter(
    (g) =>
      !curatedSlugs.has(g.slug) &&
      g.tags?.some((t) => KIDS_TAGS.some((k) => t.toLowerCase().includes(k)))
  );

  const fillGames = allGames
    .filter(
      (g) =>
        !curatedSlugs.has(g.slug) &&
        !tagGames.find((x) => x.slug === g.slug) &&
        (g.category === "casual" || g.category === "puzzle") &&
        g.rating >= 4.0
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 40);

  const displayGames = [...curatedGames, ...tagGames, ...fillGames];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CollectionPageSchema
        name="Free Games for Kids"
        description="Safe free online games for kids. No download, no account, no ads. Puzzles, animals, classics."
        url="/free-games-for-kids"
        games={displayGames}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Games for Kids", url: "/free-games-for-kids" },
        ]}
      />
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/20 rounded-2xl p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="text-base">👧</span>
          Safe for All Ages
        </div>
        <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
          Free Games for Kids
        </h1>
        <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
          Safe, fun, and completely <strong className="text-white">free online games for kids</strong> —
          no download, no sign-up, no credit card. All games run instantly in your browser and are
          appropriate for children of all ages. Hundreds of kid-friendly titles updated regularly.
        </p>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="px-4 py-2 bg-white/10 hover:bg-pink-600 text-white text-sm rounded-lg transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Safety badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "🛡️", title: "Safe Content", body: "Curated for age-appropriate fun" },
          { icon: "🚫", title: "No Sign-Up", body: "Just click and play — no accounts" },
          { icon: "⚡", title: "Instant Play", body: "Loads in seconds, no downloads" },
          { icon: "📱", title: "Works on Tablets", body: "Touch-friendly on iPad & Android" },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-white font-semibold text-sm">{title}</p>
            <p className="text-gray-400 text-xs mt-1">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot format="banner" className="w-full" />

      {/* Game grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🎮 Free Kids Games ({displayGames.length}+)
          </h2>
          <Link href="/games" className="text-violet-400 hover:text-violet-300 text-sm">
            View all games →
          </Link>
        </div>
        <GameGrid games={displayGames} priorityCount={8} />
      </section>

      <AdSlot format="banner" className="w-full" />

      {/* Categories for kids */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">Browse by Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            {
              emoji: "🧩",
              title: "Puzzle Games",
              desc: "Logic puzzles, sorting games, and brain teasers perfect for kids.",
              href: "/category/puzzle",
            },
            {
              emoji: "🎨",
              title: "Coloring Games",
              desc: "Creative drawing and coloring games for artistic kids.",
              href: "/tag/coloring",
            },
            {
              emoji: "🐼",
              title: "Animal Games",
              desc: "Cute animal adventures, care games, and animal-themed puzzles.",
              href: "/tag/animals",
            },
            {
              emoji: "🏃",
              title: "Running Games",
              desc: "Endless runners and parkour games that are easy to pick up.",
              href: "/tag/run",
            },
            {
              emoji: "🧠",
              title: "Brain Games",
              desc: "Educational and math games that are actually fun to play.",
              href: "/brain-games",
            },
            {
              emoji: "😄",
              title: "Casual Games",
              desc: "Simple, fun games with easy controls for younger players.",
              href: "/category/casual",
            },
          ].map(({ emoji, title, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-[#1a1a2e] hover:bg-[#22223b] border border-white/10 hover:border-violet-500/30 rounded-xl p-5 transition-all group"
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <h3 className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">{title}</h3>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5 max-w-3xl">
        <h2 className="text-white font-bold text-xl">The Best Free Online Games for Kids</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Finding safe, quality games for kids online can be a challenge — many sites are cluttered
          with ads, require downloads, or host content that isn't age-appropriate. At FreePlayArena,
          all games run instantly in your browser with no installs and no sign-up required. Parents
          can feel confident knowing every game here is a standard HTML5 browser game — nothing downloads
          to the device, and there are no in-app purchases or account requirements.
        </p>

        <h3 className="text-white font-semibold text-lg">Puzzle Games for Kids</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Puzzle games are excellent for children because they develop problem-solving skills while
          staying engaging. Titles like <strong className="text-white">2048</strong>,{" "}
          <strong className="text-white">Sudoku</strong>, and{" "}
          <strong className="text-white">Minesweeper</strong> offer adjustable difficulty so kids of
          all ages can find a comfortable challenge. Animal-themed puzzles like{" "}
          <strong className="text-white">ZooLogic</strong> and{" "}
          <strong className="text-white">Finding Red Panda</strong> add a fun visual element that
          younger kids especially enjoy.
        </p>

        <h3 className="text-white font-semibold text-lg">Classic Games Kids Love</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Some games never get old. <strong className="text-white">Snake</strong>,{" "}
          <strong className="text-white">Tetris</strong>, and{" "}
          <strong className="text-white">Simon Says</strong> have entertained kids for decades and
          remain as fun as ever in their browser-based forms. These classics are especially good for
          kids because they have simple rules, quick sessions, and are easy to replay.
        </p>

        <h3 className="text-white font-semibold text-lg">Do These Games Require WiFi?</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Most games require an internet connection to load, but once loaded, many will continue
          running even with an interrupted connection. For fully offline play, check out our{" "}
          <Link href="/no-download-games" className="text-violet-400 hover:text-violet-300">no-download games</Link>{" "}
          collection which includes lightweight games that cache well in the browser.
        </p>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "Are these games safe for children?",
                a: "Yes. All games on FreePlayArena are HTML5 browser games from established game publishers. There are no violent or inappropriate games in this collection. Nothing downloads to your device — games run entirely in the browser window.",
              },
              {
                q: "Can kids play these games on a tablet or phone?",
                a: "Absolutely. All games here are optimized for touch screens and work well on iPad, Android tablets, and smartphones. The controls are adapted for touch input.",
              },
              {
                q: "Are there any educational games?",
                a: "Yes — our Brain Games and puzzle sections include math games, number puzzles, word games, and logic games that help develop skills while being genuinely fun to play.",
              },
              {
                q: "Do the games have ads?",
                a: "Some games include ads from their developers inside the game. For a fully ad-free experience, check our Ad Free Games section which includes open-source classics like Snake, Tetris, Minesweeper, and Sudoku.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h4 className="text-white font-semibold text-sm mb-1">{q}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section>
        <h2 className="text-white font-semibold mb-4">More Game Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "✓ Ad Free Games", href: "/ad-free-games" },
            { label: "🎓 School Games", href: "/school-games" },
            { label: "🧠 Brain Games", href: "/brain-games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="py-3 px-4 bg-[#1a1a2e] hover:bg-[#22223b] border border-white/10 text-gray-300 hover:text-white text-sm rounded-xl transition-all text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
