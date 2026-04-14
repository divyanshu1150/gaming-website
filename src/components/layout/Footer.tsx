import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a15] border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎮</span>
              <span className="font-bold text-white text-lg">FreePlayArena</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Play hundreds of free online games instantly — no download, no sign-up required.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/freeplayarena"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FreePlayArena on Twitter/X"
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-violet-600 rounded-lg transition-colors text-gray-400 hover:text-white text-sm"
              >
                𝕏
              </a>
              <a
                href="https://youtube.com/@freeplayarena"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FreePlayArena on YouTube"
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-red-600 rounded-lg transition-colors text-gray-400 hover:text-white text-sm"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">Categories</h3>
            <ul className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-gray-400 hover:text-violet-400 text-sm transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Browse</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/games" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/unblocked-games" className="text-green-400 hover:text-green-300 text-sm transition-colors">
                  🔓 Unblocked Games
                </Link>
              </li>
              <li>
                <Link href="/puzzle-games" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
                  Puzzle Games
                </Link>
              </li>
              <li>
                <Link href="/no-download-games" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
                  No Download Games
                </Link>
              </li>
              <li>
                <Link href="/games-to-play-when-bored" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
                  Games When Bored
                </Link>
              </li>
              <li>
                <Link href="/games?sort=popular" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
                  Most Popular
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FreePlayArena.com — All games are property of their respective owners.</p>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="hover:text-violet-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-violet-400 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-violet-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-violet-400 transition-colors">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
