"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  format: "banner" | "rectangle" | "sidebar";
  className?: string;
  slot?: string; // AdSense slot ID — set via env or prop
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";

const DIMS: Record<string, string> = {
  banner: "w-full min-h-[90px]",
  rectangle: "w-[300px] min-h-[250px]",
  sidebar: "w-[300px] min-h-[600px]",
};

export default function AdSlot({ format, className = "", slot }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!PUBLISHER_ID || !slot || pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, [slot]);

  // Dev placeholder or no publisher ID
  if (!PUBLISHER_ID || !slot) {
    return (
      <div
        className={`flex items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-lg text-gray-600 text-xs ${DIMS[format]} ${className}`}
      >
        Ad Slot ({format})
      </div>
    );
  }

  // Real AdSense slot
  return (
    <div className={`${DIMS[format]} ${className} overflow-hidden`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
