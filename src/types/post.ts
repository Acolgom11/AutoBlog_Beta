export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  created_at: string;
  published?: boolean;
  author?: string;
  read_time?: string;
}

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  image: string | null;
  published: boolean;
}
