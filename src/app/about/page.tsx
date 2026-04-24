import type { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "@/lib/games";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about FreePlayArena — your home for free online HTML5 games, no download or sign-up required.",
  alternates: { canonical: "https://freeplayarena.com/about" },
};

export default function AboutPage() {
  const games = getAllGames();
  const gameCount = games.length;
  const categoryCount = CATEGORIES.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-4">About FreePlayArena</h1>

      <div className="space-y-8 text-gray-300">

        <section>
          <p className="text-lg leading-relaxed">
            <strong className="text-white">FreePlayArena</strong> is a free online gaming platform where you
            can play hundreds of browser-based games instantly — no download, no sign-up, no hassle.
            Just click and play.
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: `${gameCount}+`, label: "Games" },
            { value: `${categoryCount}`, label: "Categories" },
            { value: "100%", label: "Free" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
            >
              <div className="text-3xl font-bold text-violet-400">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">What We Offer</h2>
          <ul className="space-y-2">
            {[
              "Action, racing, puzzle, sports, arcade, and more",
              "HTML5 games that work on any modern browser",
              "Mobile-friendly design — play on phone, tablet, or desktop",
              "No accounts, no downloads, no ads before every game",
              "New games added regularly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-violet-400 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Our Mission</h2>
          <p className="leading-relaxed">
            We believe gaming should be accessible to everyone. Our mission is to provide a clean,
            fast, and enjoyable platform where people of all ages can discover and play great games
            without barriers. Whether you have five minutes or five hours, FreePlayArena has something
            for you.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Game Providers</h2>
          <p className="leading-relaxed">
            Games on FreePlayArena are sourced from leading HTML5 game publishers and developers
            around the world. All games are licensed for browser-based distribution. We work with
            trusted game networks to ensure a safe and enjoyable experience.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Contact Us</h2>
          <p>
            Have a question, suggestion, or want to report a broken game? We&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-3 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get in Touch
          </Link>
        </section>

      </div>
    </div>
  );
}
