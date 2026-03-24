export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  created_at: string;
}

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  image: string | null;
}
