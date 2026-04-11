"use client";

import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Play ${title} free online`, url });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to copy
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard also failed — silent fail
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-violet-600 text-white text-xs rounded-lg transition-colors"
    >
      {copied ? "✓ Copied!" : "🔗 Share"}
    </button>
  );
}
