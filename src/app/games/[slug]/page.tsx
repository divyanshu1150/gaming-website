import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGameBySlug, getAllGameSlugs, getRelatedGames, getAllGames } from "@/lib/games";
import GameEmbed from "@/components/game/GameEmbed";
import RelatedGames from "@/components/game/RelatedGames";
import AdSlot from "@/components/ads/AdSlot";
import GameSchema from "@/components/game/GameSchema";
import ShareButton from "@/components/game/ShareButton";
import PlayCount from "@/components/game/PlayCount";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGameSlugs();
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  const pageUrl = `${BASE_URL}/games/${slug}`;
  const thumbUrl = `${BASE_URL}${game.thumbnail}`;

  // Cap shortDescription so total description stays under 160 chars
  const shortDesc =
    game.shortDescription.length > 80
      ? `${game.shortDescription.slice(0, 80).trim()}…`
      : game.shortDescription;
  const metaDesc = `Play ${game.title} free online — no download, no sign-up. ${shortDesc}`;

  return {
    // Use absolute title to skip the global template — keeps total length under 60 chars
    // even after Google appends the brand.
    title: { absolute: `Play ${game.title} Free Online — No Download | FreePlayArena` },
    description: metaDesc,
    keywords: [
      `play ${game.title} online`,
      `${game.title} free`,
      `${game.title} online`,
      `${game.title} no download`,
      ...game.tags,
      game.category,
      "free online game",
      "browser game",
    ],
    openGraph: {
      title: `Play ${game.title} Free Online — No Download`,
      description: metaDesc,
      url: pageUrl,
      type: "website",
      images: [{ url: thumbUrl, width: 1200, height: 630, alt: game.thumbnailAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${game.title} Free Online`,
      description: metaDesc,
      images: [thumbUrl],
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = getRelatedGames(game.relatedSlugs);
  const pageUrl = `${BASE_URL}/games/${slug}`;
  const thumbUrl = `${BASE_URL}${game.thumbnail}`;

  // Pick a few random other games for "More games you might like" if not enough related
  const allGames = getAllGames();
  const moreGames = allGames
    .filter((g) => g.slug !== slug && !game.relatedSlugs.includes(g.slug) && g.category === game.category)
    .slice(0, 6);

  return (
    <>
      <GameSchema game={game} url={pageUrl} thumbnailUrl={thumbUrl} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <span>/</span>
          <Link href="/games" className="hover:text-violet-400">Games</Link>
          <span>/</span>
          <Link href={`/category/${game.category}`} className="hover:text-violet-400 capitalize">{game.category}</Link>
          <span>/</span>
          <span className="text-gray-400">{game.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          {/* Main column */}
          <div className="space-y-6">
            {/* Game embed */}
            <GameEmbed game={game} />

            {/* Game info */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-white font-bold text-2xl">{game.title}</h1>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <Link href={`/category/${game.category}`} className="text-violet-400 text-sm capitalize hover:text-violet-300">
                      {game.category}
                    </Link>
                    <span className="text-gray-500 text-sm">by {game.developer}</span>
                    <span className="text-gray-500 text-sm">{game.releaseYear}</span>
                    {game.embedType === "gamemonetize" && (
                      <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                        📢 Contains in-game ads
                      </span>
                    )}
                    {game.embedType === "other" && (
                      <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        ✓ Ad Free
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">★ {game.rating.toFixed(1)}</div>
                    <PlayCount slug={game.slug} basePlays={game.plays} />
                  </div>
                  <ShareButton title={game.title} url={pageUrl} />
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{game.description}</p>

              {/* Clickable tags */}
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-white/10 hover:bg-violet-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Instructions */}
              <div className="border-t border-white/10 pt-4">
                <h2 className="text-white font-semibold text-sm mb-1">How to Play {game.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{game.instructions}</p>
              </div>
            </div>

            {/* About this game — richer SEO content */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 space-y-5">
              <h2 className="text-white font-semibold text-lg">About {game.title}</h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">{game.title}</strong> is a free{" "}
                <Link href={`/category/${game.category}`} className="text-violet-400 hover:underline capitalize">
                  {game.category}
                </Link>{" "}
                game developed by <strong className="text-white">{game.developer}</strong>. You can play it
                directly in your browser — no download or installation required. The game is fully
                compatible with desktop and mobile devices, so you can enjoy it on your phone, tablet, or
                computer.
              </p>

              <p className="text-gray-300 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Game details table */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Developer", value: game.developer },
                      { label: "Category", value: <Link href={`/category/${game.category}`} className="text-violet-400 hover:underline capitalize">{game.category}</Link> },
                      { label: "Platform", value: "Browser (HTML5)" },
                      { label: "Release Year", value: game.releaseYear ?? "N/A" },
                      { label: "Rating", value: `★ ${game.rating.toFixed(1)} / 5` },
                      { label: "Price", value: "Free" },
                    ].map(({ label, value }) => (
                      <tr key={label} className="border-b border-white/10 last:border-0">
                        <td className="px-4 py-3 text-gray-400 bg-white/[0.02] w-1/3 font-medium">{label}</td>
                        <td className="px-4 py-3 text-gray-200">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tips section */}
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Tips &amp; Tricks</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-violet-400 flex-shrink-0">•</span>
                    <span>Use the fullscreen button for the best experience on desktop.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-400 flex-shrink-0">•</span>
                    <span>If the game doesn&apos;t load, try refreshing the page or switching browsers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-400 flex-shrink-0">•</span>
                    <span>
                      {game.category === "puzzle"
                        ? "Take your time — rushing through puzzles often leads to mistakes. Plan several moves ahead."
                        : game.category === "racing"
                        ? "Learn the track layout first. Smooth steering beats aggressive braking every time."
                        : game.category === "action"
                        ? "Master the controls before diving into harder levels. Muscle memory is key."
                        : game.category === "sports"
                        ? "Timing is everything — watch the movement patterns before making your move."
                        : game.category === "adventure"
                        ? "Explore every corner of the map — hidden items and shortcuts are often off the beaten path."
                        : "Practice the basic mechanics first and build up your skills gradually."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* More games in same category */}
            {moreGames.length > 0 && (
              <div className="bg-[#1a1a2e] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold">
                    More <span className="capitalize">{game.category}</span> Games
                  </h2>
                  <Link href={`/category/${game.category}`} className="text-violet-400 hover:text-violet-300 text-sm">
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {moreGames.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/games/${g.slug}`}
                      className="group flex flex-col bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.thumbnail}
                        alt={g.title}
                        width={200}
                        height={120}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="px-2 py-1.5 text-gray-300 group-hover:text-white text-xs font-medium leading-tight">
                        {g.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ad below game info */}
            <AdSlot format="banner" className="w-full" />

            {/* Related games */}
            <RelatedGames games={related} />

            {/* Contextual collection links — built from this game's properties */}
            <div className="bg-[#1a1a2e] rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 text-base">Explore More Collections</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {game.embedType === "other" || game.embedType === "self-hosted" ? (
                  <Link href="/ad-free-games" className="px-3 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-300 hover:text-green-200 text-xs rounded-lg transition-colors text-center">
                    ✓ Ad Free Games
                  </Link>
                ) : null}
                <Link href="/unblocked-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                  🔓 Unblocked Games
                </Link>
                <Link href="/no-download-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                  ⚡ No Download
                </Link>
                {game.category === "puzzle" && (
                  <Link href="/puzzle-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    🧩 Puzzle Games
                  </Link>
                )}
                {(game.tags?.includes("brain") || game.tags?.includes("logic") || game.tags?.includes("educational")) && (
                  <Link href="/brain-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    🧠 Brain Games
                  </Link>
                )}
                {(game.tags?.some((t) => ["2 player", "2-player", "multiplayer", "board"].includes(t))) && (
                  <Link href="/2-player-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    👥 2 Player Games
                  </Link>
                )}
                {(game.tags?.some((t) => ["kid", "kids", "children", "family", "cute", "animal"].some((k) => t.includes(k)))) && (
                  <Link href="/free-games-for-kids" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    👧 Games for Kids
                  </Link>
                )}
                {(game.tags?.some((t) => ["word"].includes(t)) || game.category === "casual") && (
                  <Link href="/games-like-wordle" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    🟨 Games Like Wordle
                  </Link>
                )}
                {(game.tags?.includes("classic") || game.tags?.includes("retro")) && (
                  <Link href="/classic-games" className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-lg transition-colors text-center">
                    🎮 Classic Games
                  </Link>
                )}
                <Link href="/game-of-the-day" className="px-3 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-300 hover:text-yellow-200 text-xs rounded-lg transition-colors text-center">
                  ⭐ Game of the Day
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:flex flex-col gap-4 mt-0">
            <AdSlot format="rectangle" />
            <AdSlot format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
