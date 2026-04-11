"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <Link
        href="/games"
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          pathname === "/games"
            ? "bg-violet-600 text-white"
            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
        }`}
      >
        🎮 All Games
      </Link>
      {CATEGORIES.map((cat) => {
        const active = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active
                ? "bg-violet-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
