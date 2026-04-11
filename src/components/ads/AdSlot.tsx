"use client";

interface AdSlotProps {
  format: "banner" | "rectangle" | "sidebar";
  className?: string;
}

export default function AdSlot({ format, className = "" }: AdSlotProps) {
  const dims = {
    banner: "w-full h-[90px]",
    rectangle: "w-[300px] h-[250px]",
    sidebar: "w-[300px] h-[600px]",
  };

  // In production, replace this div with your actual AdSense ins tag
  return (
    <div
      className={`flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-600 text-xs ${dims[format]} ${className}`}
    >
      Advertisement
    </div>
  );
}
