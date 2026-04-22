import type { BlogPost } from "@/types/blog";
import type { Game } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://freeplayarena.com";

interface ArticleSchemaProps {
  post: BlogPost;
  game?: Game;
}

export default function ArticleSchema({ post, game }: ArticleSchemaProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "FreePlayArena",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "FreePlayArena",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    ...(game
      ? {
          about: {
            "@type": "VideoGame",
            name: game.title,
            url: `${BASE_URL}/games/${game.slug}`,
            image: game.thumbnail,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
