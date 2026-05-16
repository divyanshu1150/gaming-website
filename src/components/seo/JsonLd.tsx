import type { Game } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

/** Render a JSON-LD <script> block from any schema.org object. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema — emits a JSON-LD script tag for an array of Q&A pairs. */
export function FAQPageSchema({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/** BreadcrumbList schema. Pass the full URL path for each crumb. */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

interface CollectionPageProps {
  name: string;
  description: string;
  url: string;
  games: Game[];
  maxItems?: number;
}

/**
 * CollectionPage + ItemList schema for category, tag, and landing pages.
 * Lists each game as a VideoGame entity so Google can show carousels.
 */
export function CollectionPageSchema({
  name,
  description,
  url,
  games,
  maxItems = 30,
}: CollectionPageProps) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const items = games.slice(0, maxItems);

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: fullUrl,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "FreePlayArena",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/games/${g.slug}`,
        item: {
          "@type": "VideoGame",
          name: g.title,
          url: `${BASE_URL}/games/${g.slug}`,
          image: g.thumbnail?.startsWith("http")
            ? g.thumbnail
            : `${BASE_URL}${g.thumbnail ?? "/opengraph-image"}`,
          genre: g.category,
          gamePlatform: "Web Browser",
          applicationCategory: "Game",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      })),
    },
  };
  return <JsonLd data={data} />;
}
