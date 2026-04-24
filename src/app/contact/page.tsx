import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact FreePlayArena — report a broken game, suggest a new game, or get in touch with our team.",
  alternates: { canonical: "https://freeplayarena.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
      <p className="text-gray-400 mb-10">
        Have a question, found a broken game, or want to suggest something? We&apos;re here to help.
      </p>

      <div className="grid gap-6 mb-12">
        {[
          {
            icon: "🐛",
            title: "Report a Broken Game",
            body: "If a game isn't loading or shows an error, let us know and we'll fix it.",
            email: "support@freeplayarena.com",
            subject: "Broken Game Report",
          },
          {
            icon: "🎮",
            title: "Suggest a Game",
            body: "Know a great free HTML5 game we should add? Send us the link!",
            email: "games@freeplayarena.com",
            subject: "Game Suggestion",
          },
          {
            icon: "💼",
            title: "Business & Partnerships",
            body: "For advertising, partnerships, or developer inquiries.",
            email: "business@freeplayarena.com",
            subject: "Business Inquiry",
          },
          {
            icon: "🔒",
            title: "Privacy & Legal",
            body: "For privacy requests, DMCA notices, or legal matters.",
            email: "privacy@freeplayarena.com",
            subject: "Privacy / Legal",
          },
        ].map(({ icon, title, body, email, subject }) => (
          <a
            key={email}
            href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
            className="group flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/50 hover:bg-white/8 transition-all"
          >
            <span className="text-3xl flex-shrink-0">{icon}</span>
            <div>
              <h2 className="text-white font-semibold group-hover:text-violet-400 transition-colors">
                {title}
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">{body}</p>
              <p className="text-violet-400 text-sm mt-2 font-medium">{email}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-2">Response Times</h2>
        <p className="text-gray-400 text-sm">
          We aim to respond to all inquiries within <strong className="text-white">1–3 business days</strong>.
          For broken game reports, we typically investigate within 24 hours.
        </p>
      </div>
    </div>
  );
}
