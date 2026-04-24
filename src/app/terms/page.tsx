import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for FreePlayArena — rules for using our free online games site.",
  alternates: { canonical: "https://freeplayarena.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: April 12, 2026</p>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using FreePlayArena (&quot;Site&quot;, &quot;we&quot;, &quot;our&quot;), located at{" "}
            <strong>freeplayarena.com</strong>, you agree to be bound by these Terms of Service. If you do
            not agree to these terms, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">2. Description of Service</h2>
          <p>
            FreePlayArena is a free online gaming platform that aggregates and embeds HTML5 games from
            third-party providers. We do not own the games displayed on the Site; they are provided by
            their respective developers and publishers under their own terms.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">3. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes and in a way that does not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Transmit harmful, offensive, or disruptive content</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its servers</li>
            <li>Use automated tools (bots, scrapers) to access the Site without our permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">4. Intellectual Property</h2>
          <p>
            All games available on FreePlayArena are the property of their respective developers and
            publishers. FreePlayArena does not claim ownership of any third-party game content.
          </p>
          <p>
            The FreePlayArena website design, logo, and original content are owned by FreePlayArena and may
            not be reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">5. Third-Party Content and Links</h2>
          <p>
            The Site embeds games and may contain links to third-party websites. We are not responsible for
            the content, privacy practices, or availability of those third-party sites. Accessing third-party
            content is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">6. Advertising</h2>
          <p>
            FreePlayArena displays advertisements via Google AdSense and game providers&apos; built-in ad
            systems. These ads help us keep the Site free. We are not responsible for the content of
            third-party advertisements.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">7. Disclaimer of Warranties</h2>
          <p>
            The Site and all content are provided &quot;as is&quot; without warranty of any kind, express or
            implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses
            or other harmful components. Games are embedded from third-party sources and their availability
            is outside our control.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, FreePlayArena shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of the Site or
            any game accessed through it.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">9. Age Requirements</h2>
          <p>
            The Site is intended for users of all ages. However, some games may contain content suitable
            only for older audiences. Parents and guardians are encouraged to monitor the games their
            children play.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately
            upon posting. Your continued use of the Site after any changes constitutes acceptance of the
            new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
            shall be resolved through good-faith negotiation or, if necessary, through appropriate legal
            channels.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">12. Contact</h2>
          <p>
            For questions about these Terms, contact us at <strong>legal@freeplayarena.com</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
