import { Game } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

interface GameSchemaProps {
  game: Game;
  url: string;
  thumbnailUrl: string;
}

export default function GameSchema({ game, url, thumbnailUrl }: GameSchemaProps) {
  // VideoGame schema
  // Note: aggregateRating omitted — we don't collect real reviews and Google
  // tightened review-schema policy. Plays are tracked separately via InteractionCounter.
  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    url,
    image: thumbnailUrl,
    genre: game.category,
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: game.developer,
    },
    interactionStatistic:
      game.plays > 0
        ? {
            "@type": "InteractionCounter",
            interactionType: { "@type": "PlayAction" },
            userInteractionCount: game.plays,
          }
        : undefined,
    keywords: game.tags.join(", "),
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Games",
        item: `${BASE_URL}/games`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: game.category.charAt(0).toUpperCase() + game.category.slice(1),
        item: `${BASE_URL}/category/${game.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: game.title,
        item: url,
      },
    ],
  };

  // FAQ schema — helps win "how to play X" rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do you play ${game.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: game.instructions,
        },
      },
      {
        "@type": "Question",
        name: `Is ${game.title} free to play?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${game.title} is completely free to play on FreePlayArena. No download, no account, and no payment required — just open your browser and start playing instantly.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need to download ${game.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No download is needed. ${game.title} runs entirely in your web browser using HTML5 technology. It works on desktop, laptop, tablet, and mobile devices without installing anything.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I play ${game.title} on my phone?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${game.title} is compatible with smartphones and tablets. The game works in any modern mobile browser on Android and iOS without any app download.`,
        },
      },
      {
        "@type": "Question",
        name: `Who made ${game.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${game.title} was developed by ${game.developer}. You can play it for free on FreePlayArena along with hundreds of other free online games.`,
        },
      },
    ],
  };

  const schemas = [videoGameSchema, breadcrumbSchema, faqSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
