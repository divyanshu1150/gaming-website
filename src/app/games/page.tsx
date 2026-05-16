import type { Metadata } from "next";
import { getAllGames } from "@/lib/games";
import GamesClientPage from "./GamesClientPage";

interface GamesPageProps {
  searchParams: Promise<{ q?: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

export const metadata: Metadata = {
  title: "All Free Online Games — Browse 400+ HTML5 Browser Games",
  description:
    "Browse all free online games at FreePlayArena. Action, puzzle, racing, sports, adventure, casual — 400+ HTML5 browser games. No download, no sign-up.",
  keywords: ["free online games", "all games", "browser games", "html5 games", "no download games"],
  alternates: { canonical: `${BASE_URL}/games` },
  openGraph: {
    title: "All Free Online Games — 400+ Browser Games",
    description: "Browse and search 400+ free online HTML5 games. No download, no sign-up.",
    url: `${BASE_URL}/games`,
    type: "website",
  },
};

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams;
  const games = getAllGames();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-white font-bold text-2xl mb-6">All Games</h1>
      <GamesClientPage games={games} initialQuery={params.q ?? ""} />
    </div>
  );
}
