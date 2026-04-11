import { NextRequest, NextResponse } from "next/server";

const HEADERS = {
  Referer: "https://gamedistribution.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
};

// Try these variants in order until one succeeds
function getCandidateUrls(hash: string): string[] {
  return [
    `https://img.gamedistribution.com/${hash}-512x512.jpeg`,
    `https://img.gamedistribution.com/${hash}-512x512.jpg`,
    `https://img.gamedistribution.com/${hash}-512x384.jpeg`,
    `https://img.gamedistribution.com/${hash}-512x384.jpg`,
    `https://img.gamedistribution.com/${hash}-200x120.jpeg`,
    `https://img.gamedistribution.com/${hash}-200x120.jpg`,
  ];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) {
  const { hash } = await params;

  if (!/^[a-f0-9]{32}$/.test(hash)) {
    return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
  }

  for (const url of getCandidateUrls(hash)) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) continue;

      const buffer = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") || "image/jpeg";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=604800, immutable",
        },
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json({ error: "Image not found" }, { status: 404 });
}
