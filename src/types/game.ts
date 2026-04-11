export type EmbedType = "gamedistribution" | "itch" | "self-hosted" | "other";
export type AspectRatio = "16/9" | "4/3" | "1/1";

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  embedUrl: string;
  embedType: EmbedType;
  source: string;
  aspectRatio: AspectRatio;
  featured: boolean;
  plays: number;
  rating: number;
  releaseYear: number;
  developer: string;
  instructions: string;
  relatedSlugs: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
