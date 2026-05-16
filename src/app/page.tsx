import Link from "next/link";
import { getFeaturedGames, getPopularGames, getAllGames, getNewGames } from "@/lib/games";
import { CATEGORIES } from "@/lib/categories";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import HeroBanner from "@/components/home/HeroBanner";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";
import { FAQPageSchema } from "@/components/seo/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FreePlayArena",
  url: BASE_URL,
  logo: `${BASE_URL}/icon`,
  description: "Free online games — no download, no sign-up. Play hundreds of HTML5 browser games instantly.",
  sameAs: [
    "https://twitter.com/freeplayarena",
    "https://youtube.com/@freeplayarena",
  ],
};

const siteLinksSearchBoxSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FreePlayArena",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/games?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const HOMEPAGE_FAQS = [
  {
    question: "Are all games on FreePlayArena really free?",
    answer: "Yes, absolutely. Every game is free to play with no hidden charges. The site is supported by advertising, which keeps everything free for players.",
  },
  {
    question: "Do I need to create an account to play?",
    answer: "No account required. You can start playing any game instantly. Your recently played games are saved locally in your browser for convenience.",
  },
  {
    question: "Can I play on my phone or tablet?",
    answer: "Yes. All games are HTML5-based and fully compatible with modern mobile browsers on iOS and Android. Simply visit the site on your device and play.",
  },
  {
    question: "How often are new games added?",
    answer: "We regularly add new games to the library. Check the homepage or browse All Games to discover the latest additions.",
  },
  {
    question: "A game isn't loading — what should I do?",
    answer: "Try refreshing the page or clearing your browser cache. Some games require a stable internet connection. If a game consistently fails to load, use our Contact page to report it.",
  },
  {
    question: "Can I suggest a game to add?",
    answer: "Definitely. Visit our Contact page and send us a suggestion with a link to the game. We review all submissions.",
  },
];

export default function HomePage() {
  const featured = getFeaturedGames(6);
  const popular = getPopularGames(10);
  const newGames = getNewGames(8);
  const allGames = getAllGames();
  const heroGame = featured[0];
  const gameCount = allGames.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLinksSearchBoxSchema) }}
      />
      <FAQPageSchema faqs={HOMEPAGE_FAQS} />
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero banner */}
      {heroGame && <HeroBanner game={heroGame} />}

      {/* Intro text — critical for SEO */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8">
        <h2 className="text-white text-2xl font-bold mb-3">
          Free Online Games — No Download, No Sign-Up
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Welcome to <strong className="text-white">FreePlayArena</strong>, your home for{" "}
          <strong className="text-white">{gameCount}+ free online games</strong> playable instantly in your
          browser. Whether you&apos;re into high-speed racing, brain-bending puzzles, action-packed shooters,
          or classic sports games — we have something for every player. No downloads, no accounts, no
          paywalls. Just click and play.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Our library spans{" "}
          {CATEGORIES.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/category/${c.slug}`} className="text-violet-400 hover:underline">
                {c.name.toLowerCase()}
              </Link>
              {i < CATEGORIES.length - 2 ? ", " : i === CATEGORIES.length - 2 ? " and " : ""}
            </span>
          ))}{" "}
          games — all hand-picked, HTML5-powered, and mobile-friendly. New titles are added regularly so
          there&apos;s always something fresh to discover.
        </p>
      </section>

      {/* Ad banner */}
      <div className="flex justify-center">
        <AdSlot format="banner" className="max-w-3xl w-full" />
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">Browse by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-[#1a1a2e] hover:bg-[#22223b] rounded-xl p-4 transition-colors group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-gray-300 group-hover:text-white text-xs font-medium text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">⭐ Featured Games</h2>
          <Link href="/games?featured=true" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={featured} priorityCount={6} />
      </section>

      {/* Ad banner mid */}
      <div className="flex justify-center">
        <AdSlot format="banner" className="max-w-3xl w-full" />
      </div>

      {/* Popular games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">🔥 Most Popular</h2>
          <Link href="/games?sort=popular" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={popular} priorityCount={0} />
      </section>

      {/* New games */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">🆕 New Games</h2>
          <Link href="/games" className="text-violet-400 hover:text-violet-300 text-sm">
            View all →
          </Link>
        </div>
        <GameGrid games={newGames} priorityCount={0} />
      </section>

      {/* Recently played — client component, only shows if localStorage has data */}
      <RecentlyPlayed allGames={allGames} />

      {/* Why FreePlayArena */}
      <section>
        <h2 className="text-white font-bold text-xl mb-6">Why Play on FreePlayArena?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: "⚡",
              title: "Instant Play",
              body: "Every game loads directly in your browser. No app store, no installer, no waiting — just click and start playing in seconds.",
            },
            {
              icon: "📱",
              title: "Works on Any Device",
              body: "All games are built with HTML5 and run on phones, tablets, laptops, and desktops. Landscape or portrait, touchscreen or mouse.",
            },
            {
              icon: "🆓",
              title: "100% Free Forever",
              body: "Every single game on FreePlayArena is completely free to play. No coins, no premium passes, no hidden paywalls.",
            },
            {
              icon: "🔒",
              title: "No Account Needed",
              body: "We don&apos;t ask for your email or personal details. Your recently played games are saved right in your browser — private and local.",
            },
            {
              icon: "🎯",
              title: "Curated Library",
              body: `We hand-pick every game for quality and fun factor. With ${gameCount}+ titles across 6 categories, finding your next favourite is easy.`,
            },
            {
              icon: "🌐",
              title: "Safe & Family Friendly",
              body: "Games are sourced from trusted publishers and embedded securely. No malware, no pop-ups, no sketchy downloads.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl">
        <h2 className="text-white font-bold text-xl mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Are all games on FreePlayArena really free?",
              a: "Yes, absolutely. Every game is free to play with no hidden charges. The site is supported by advertising, which keeps everything free for players.",
            },
            {
              q: "Do I need to create an account to play?",
              a: "No account required. You can start playing any game instantly. Your recently played games are saved locally in your browser for convenience.",
            },
            {
              q: "Can I play on my phone or tablet?",
              a: "Yes. All games are HTML5-based and fully compatible with modern mobile browsers on iOS and Android. Simply visit the site on your device and play.",
            },
            {
              q: "How often are new games added?",
              a: "We regularly add new games to the library. Check the homepage or browse All Games to discover the latest additions.",
            },
            {
              q: "A game isn't loading — what should I do?",
              a: "Try refreshing the page or clearing your browser cache. Some games require a stable internet connection. If a game consistently fails to load, use our Contact page to report it.",
            },
            {
              q: "Can I suggest a game to add?",
              a: "Definitely! Visit our Contact page and send us a suggestion with a link to the game. We review all submissions.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#1a1a2e] rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/20 rounded-2xl p-8 text-center">
        <h2 className="text-white font-bold text-2xl mb-2">Ready to Play?</h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Browse our full library of free online games — no download or sign-up required.
        </p>
        <Link
          href="/games"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-lg"
        >
          🎮 Browse All Games
        </Link>
      </section>
    </div>
    </>
  );
}
