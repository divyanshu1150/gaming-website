import { getAllGames } from "@/lib/games";
import GamesClientPage from "./GamesClientPage";

interface GamesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "All Games",
  description: "Browse and search hundreds of free online games. Filter by category, search by name, and find your next favorite game.",
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
