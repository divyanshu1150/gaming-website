import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.gamedistribution.com" },
      { protocol: "https", hostname: "img.gamemonetize.com" },
      { protocol: "https", hostname: "img.itch.zone" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "gabrielecirulli.github.io" },
      { protocol: "http",  hostname: "gabrielecirulli.github.io" },
      { protocol: "https", hostname: "hexgl.bkcore.com" },
      { protocol: "http",  hostname: "hexgl.bkcore.com" },
      { protocol: "https", hostname: "hellowordl.net" },
      { protocol: "https", hostname: "ncase.me" },
      { protocol: "http",  hostname: "ncase.me" },
      { protocol: "https", hostname: "operasoftware.github.io" },
    ],
  },
};

export default nextConfig;
