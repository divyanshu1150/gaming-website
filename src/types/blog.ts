export type PostType = "guide" | "editorial";

export interface BlogSection {
  heading?: string;
  body: string;
  listItems?: string[];
  gameSlugs?: string[];
}

interface BlogPostBase {
  slug: string;
  type: PostType;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
}

export interface EditorialPost extends BlogPostBase {
  type: "editorial";
  sections: BlogSection[];
}

export interface GuidePost extends BlogPostBase {
  type: "guide";
  gameSlug: string;
  /**
   * Optional curated sections — if present, this is a hand-written guide
   * (will be indexed). If absent, the page is auto-generated from game data
   * (will be noindexed as thin content).
   */
  sections?: BlogSection[];
}

export type BlogPost = EditorialPost | GuidePost;
