import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Redirect www → non-www (permanent 301)
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4); // strip "www."
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

// Run on all routes except static files and Next internals
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)",
  ],
};
