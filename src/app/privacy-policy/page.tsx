import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for FreePlayArena — learn how we collect and use your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: April 12, 2026</p>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to FreePlayArena (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We operate the website{" "}
            <strong>freeplayarena.com</strong> (the &quot;Site&quot;). This Privacy Policy explains what information
            we collect when you visit the Site, how we use it, and your rights regarding that information.
          </p>
          <p>
            By using the Site, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">2. Information We Collect</h2>
          <h3 className="text-white font-medium mt-4 mb-1">Automatically Collected Information</h3>
          <p>
            When you visit the Site, our servers and third-party services may automatically record certain
            information, including your IP address, browser type, referring/exit pages, operating system,
            date/time stamp, and clickstream data.
          </p>
          <h3 className="text-white font-medium mt-4 mb-1">Cookies and Local Storage</h3>
          <p>
            We use browser <strong>localStorage</strong> to save your recently played games and play counts
            locally on your device. This data never leaves your browser and is not sent to our servers.
          </p>
          <p>
            Third-party advertisers and game providers embedded on this Site may set their own cookies. We do
            not control those cookies. Please review the privacy policies of those third parties.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">3. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data independently:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google AdSense</strong> — serves advertisements. Google may use cookies to serve ads
              based on your prior visits to this or other websites.{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                Google Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>GameDistribution</strong> — provides embedded HTML5 games. Games may load scripts and
              set cookies from gamedistribution.com and its ad partners.
            </li>
            <li>
              <strong>Vercel Analytics</strong> — we may use Vercel&apos;s anonymous analytics to understand
              aggregate traffic patterns.
            </li>
          </ul>
          <p className="mt-3">
            You can opt out of Google&apos;s personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline"
            >
              Google Ad Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">4. How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate and maintain the Site</li>
            <li>To monitor usage and improve user experience</li>
            <li>To serve relevant advertisements via Google AdSense</li>
            <li>To detect and prevent fraudulent or abusive activity</li>
          </ul>
          <p className="mt-3">We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">5. Children&apos;s Privacy</h2>
          <p>
            FreePlayArena is intended for a general audience. We do not knowingly collect personal information
            from children under the age of 13. If you believe a child has provided us personal information,
            please contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">6. Data Retention</h2>
          <p>
            We do not collect or store personal user data on our servers. Any data stored locally in your
            browser (recently played games, play counts) remains on your device and can be cleared at any
            time by clearing your browser storage.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws,
            including the right to access, correct, or delete your personal data. Since we collect minimal
            personal data, most requests can be fulfilled by simply clearing your browser&apos;s localStorage.
          </p>
          <p>
            For any privacy requests, contact us at <strong>privacy@freeplayarena.com</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated &quot;Last updated&quot; date. Continued use of the Site after changes constitutes your
            acceptance of the new policy.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-2">9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <strong>privacy@freeplayarena.com</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
