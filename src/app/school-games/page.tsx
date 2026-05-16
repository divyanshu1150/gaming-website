import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { FAQPageSchema, CollectionPageSchema } from "@/components/seo/JsonLd";

const SCHOOL_FAQS = [
  {
    question: "Are these games safe to play at school?",
    answer: "Yes. These are HTML5 browser games — no downloads, no executables, no plugins. They run entirely in the browser tab and contain age-appropriate content suitable for school.",
  },
  {
    question: "Do these games work on Chromebooks?",
    answer: "Absolutely. All games are HTML5-based and run natively in Chrome browser on any Chromebook. No extensions or workarounds needed.",
  },
  {
    question: "Will my school's firewall block these games?",
    answer: "Most school firewalls block specific game domains, not FreePlayArena directly. If a particular game won't load, try a different one — we have 400+ alternatives, especially in our ad-free and educational sections.",
  },
  {
    question: "Are there educational games for school?",
    answer: "Yes. Our brain games, puzzle games, and math games sections include logic puzzles, vocabulary games, and number challenges that develop real skills while being genuinely fun.",
  },
];

export const metadata: Metadata = {
  title: "Free School Games — Play Online at School",
  description:
    "Play free online games at school with no downloads, no sign-up, and no blocked content. Safe browser games that work on Chromebook, perfect for free period.",
  keywords: [
    "games for school",
    "school games online",
    "free games to play at school",
    "unblocked school games",
    "games for school chromebook",
    "safe school games",
    "educational games online",
    "browser games for school",
    "no download school games",
    "games at school free",
  ],
  alternates: { canonical: "https://freeplayarena.com/school-games" },
};

export default function SchoolGamesPage() {
  const all = getAllGames();

  // Safe for school: self-hosted (ad-free) or educational tag
  const schoolGames = all.filter(
    (g) =>
      g.embedType === "self-hosted" ||
      g.embedType === "other" ||
      g.tags.includes("educational")
  );

  // Puzzle / brain subset for "Popular at School" section
  const brainGames = all
    .filter(
      (g) =>
        (g.category === "puzzle" || g.tags.includes("brain") || g.tags.includes("logic")) &&
        (g.embedType === "self-hosted" || g.embedType === "other" || g.tags.includes("educational"))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <FAQPageSchema faqs={SCHOOL_FAQS} />
      <CollectionPageSchema
        name="Free School Games — Play at School"
        description="Safe HTML5 games for school. Works on Chromebook, no download, no firewall issues."
        url="/school-games"
        games={schoolGames}
      />
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "School Games", url: "/school-games" },
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-900/60 to-teal-900/60 border border-green-500/20 rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Safe for School
          </div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Free Games to Play at School
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Play <strong className="text-white">free school games</strong> right in your browser —
            no download, no sign-up, no ads inside games. All games run on Chromebook, work through
            school Wi-Fi, and are safe for school networks. Perfect for free periods or after class.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "✅ No Ads In-Game", desc: "Clean experience" },
              { label: "✅ No Download", desc: "Instant browser play" },
              { label: "✅ Chromebook Ready", desc: "Works on any OS" },
              { label: "✅ No Sign-Up", desc: "Zero accounts" },
            ].map(({ label, desc }) => (
              <div key={label} className="flex flex-col bg-white/10 rounded-lg px-4 py-2">
                <span className="text-white text-sm font-semibold">{label}</span>
                <span className="text-gray-400 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🏫",
            title: "Works on School Networks",
            body: "Pure HTML5 games served over standard HTTPS. No special ports, no peer-to-peer, no plugins — exactly what school firewalls allow.",
          },
          {
            icon: "💻",
            title: "Chromebook Compatible",
            body: "Every game runs natively in Chrome browser. No extensions, no workarounds — just open the page and play instantly on any Chromebook.",
          },
          {
            icon: "🚫",
            title: "No Ads Inside Games",
            body: "Our self-hosted games are completely ad-free inside the game window. Safe, distraction-free play with no popups or video ads mid-game.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="text-3xl mb-2">{icon}</div>
            <h2 className="text-white font-semibold mb-1">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <AdSlot slot="school-games-top" className="w-full" />

      {/* Safe for School — main grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-xl">
            🛡️ Safe for School ({schoolGames.length} Games)
          </h2>
          <Link href="/ad-free-games" className="text-green-400 hover:text-green-300 text-sm">
            Ad-free games →
          </Link>
        </div>
        <GameGrid games={schoolGames} priorityCount={8} />
      </section>

      <AdSlot slot="school-games-mid" className="w-full" />

      {/* Popular at School — puzzle & brain */}
      {brainGames.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-xl">
              🧠 Popular Puzzle & Brain Games at School
            </h2>
            <Link href="/puzzle-games" className="text-teal-400 hover:text-teal-300 text-sm">
              All puzzle games →
            </Link>
          </div>
          <GameGrid games={brainGames} priorityCount={0} />
        </section>
      )}

      {/* SEO content block */}
      <section className="bg-[#1a1a2e] rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="text-white font-bold text-xl">Why Play Games at School?</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Short breaks between lessons help improve focus and reduce mental fatigue. Browser-based
          games that require quick thinking — like puzzles, logic challenges, and pattern recognition
          games — can actually sharpen cognitive skills. <strong className="text-white">FreePlayArena</strong>{" "}
          offers a curated selection of school-safe games that are fast to load, easy to pause, and
          completely free.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          Unlike other gaming sites, our self-hosted games contain no third-party ads inside the
          game window itself. That means no unexpected popups, no video ads that autoplay, and no
          content that would be inappropriate in a school setting. The games run entirely in your
          browser using HTML5 — the same technology your school website uses.
        </p>

        <h2 className="text-white font-bold text-lg">Best Games to Play on a School Chromebook</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Chromebooks are the most popular device in schools — and HTML5 games are perfectly suited
          for them. Games like <strong className="text-white">Snake</strong>,{" "}
          <strong className="text-white">Breakout</strong>,{" "}
          <strong className="text-white">2048</strong>, and{" "}
          <strong className="text-white">Tic Tac Toe</strong> require nothing beyond Chrome browser.
          They load in under 3 seconds, work with touch or keyboard controls, and don't drain battery
          the way demanding 3D games do.
        </p>

        <h2 className="text-white font-bold text-lg">Unblocked vs Safe for School</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          "Unblocked" means a game isn't blocked by your school's firewall. "Safe for school" means
          the content is appropriate — no violence, no mature themes, no disruptive ads. The best
          school games are both. Our collection prioritizes games that meet both criteria: clean
          content served over standard HTTPS that school filters are unlikely to block.
        </p>

        {/* Cross-links */}
        <h2 className="text-white font-bold text-lg">Related Pages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "🔓 Unblocked Games", href: "/unblocked-games" },
            { label: "🚫 Ad-Free Games", href: "/ad-free-games" },
            { label: "🧩 Puzzle Games", href: "/puzzle-games" },
            { label: "🧠 Brain Games", href: "/brain-games" },
            { label: "⚡ No Download Games", href: "/no-download-games" },
            { label: "🎮 All Games", href: "/games" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-500/30 text-gray-300 hover:text-white text-sm rounded-lg transition-all text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
        {[
          {
            q: "Are these games safe to play at school?",
            a: "Yes. Our self-hosted games are ad-free inside the game window and contain no inappropriate content. They use standard HTTPS and run entirely in your browser — no downloads, no executables, no third-party plugins.",
          },
          {
            q: "Do these games work on a school Chromebook?",
            a: "Absolutely. All games are HTML5-based and run natively in Chrome browser. No extensions, no Linux environment, no Android apps needed — just open the page and play.",
          },
          {
            q: "Will my school's Wi-Fi block these games?",
            a: "Our site uses standard HTTPS on a clean domain. While no site can guarantee it won't be blocked by a specific school's firewall, HTML5 game sites are far less commonly blocked than sites that use Flash or require large downloads.",
          },
          {
            q: "Do I need to create an account or sign up?",
            a: "No account required. Open any game and start playing immediately. Your recently played games are saved locally in your browser with no data sent to any server.",
          },
        ].map(({ q, a }) => (
          <div key={q} className="bg-[#1a1a2e] rounded-xl p-5">
            <h3 className="text-white font-semibold mb-2 text-sm">{q}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
