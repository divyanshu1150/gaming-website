import { Game } from "@/types/game";

interface GameSchemaProps {
  game: Game;
  url: string;
  thumbnailUrl: string;
}

export default function GameSchema({ game, url, thumbnailUrl }: GameSchemaProps) {
  const schema = {
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
    author: {
      "@type": "Organization",
      name: game.developer,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: game.plays,
    },
    keywords: game.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
