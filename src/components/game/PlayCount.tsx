"use client";

import { useEffect, useState } from "react";

interface PlayCountProps {
  slug: string;
  basePlays: number;
}

function formatPlays(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export default function PlayCount({ slug, basePlays }: PlayCountProps) {
  const [total, setTotal] = useState(basePlays);

  useEffect(() => {
    try {
      const key = `plays_${slug}`;
      const extra = parseInt(localStorage.getItem(key) ?? "0", 10);
      setTotal(basePlays + (isNaN(extra) ? 0 : extra));
    } catch {
      // localStorage unavailable
    }
  }, [slug, basePlays]);

  return <span className="text-gray-400 text-xs mt-0.5">{formatPlays(total)} plays</span>;
}
