"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/games?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f1a]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🎮</span>
          <span className="font-bold text-white text-lg hidden sm:block">
            FreePlayArena
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 ml-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/unblocked-games"
            className="px-3 py-1.5 text-sm font-semibold text-green-400 hover:text-white hover:bg-green-600/20 rounded-md transition-colors"
          >
            🔓 Unblocked
          </Link>
          <Link
            href="/ad-free-games"
            className="px-3 py-1.5 text-sm font-semibold text-emerald-400 hover:text-white hover:bg-emerald-600/20 rounded-md transition-colors"
          >
            ✓ Ad Free
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            📝 Blog
          </Link>
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Search games"
          className="flex-1 flex items-center max-w-sm ml-auto"
        >
          <div className="relative w-full">
            <label htmlFor="game-search" className="sr-only">Search games</label>
            <input
              id="game-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
              autoComplete="off"
              className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm border border-white/10 focus:outline-none focus:border-violet-500 focus:bg-white/15 transition-colors"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f0f1a] px-4 py-3 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white bg-white/10 rounded-md"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white bg-white/10 rounded-md"
          >
            📝 Blog
          </Link>
        </div>
      )}
    </header>
  );
}
