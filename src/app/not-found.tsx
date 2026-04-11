import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🎮</div>
      <h1 className="text-white font-bold text-3xl mb-2">404 — Game Not Found</h1>
      <p className="text-gray-400 mb-8">This page doesn&apos;t exist or the game may have moved.</p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/games"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
        >
          Browse Games
        </Link>
      </div>
    </div>
  );
}
