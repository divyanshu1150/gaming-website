import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import type { Game } from "@/types/game";
import { formatDate } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  roundups: "bg-violet-600/20 text-violet-400",
  guides: "bg-blue-600/20 text-blue-400",
  action: "bg-red-600/20 text-red-400",
  puzzle: "bg-yellow-600/20 text-yellow-400",
  racing: "bg-orange-600/20 text-orange-400",
  sports: "bg-green-600/20 text-green-400",
  adventure: "bg-teal-600/20 text-teal-400",
  casual: "bg-pink-600/20 text-pink-400",
};

interface PostCardProps {
  post: BlogPost;
  game?: Game;
}

export default function PostCard({ post, game }: PostCardProps) {
  const thumbnail = post.coverImage ?? game?.thumbnail;
  const colorClass = CATEGORY_COLORS[post.category] ?? "bg-white/10 text-gray-400";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-[#1a1a2e] hover:bg-[#1f1f3a] border border-white/10 hover:border-violet-500/40 rounded-xl overflow-hidden transition-all duration-200"
    >
      {/* Cover image */}
      <div className="relative aspect-video bg-[#0f0f1a] overflow-hidden">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
            📝
          </div>
        )}
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-full ${colorClass}`}
        >
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500 text-xs">{formatDate(post.publishedAt)}</span>
          <span className="text-violet-400 text-xs font-medium group-hover:translate-x-0.5 transition-transform">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
