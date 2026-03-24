import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'articles');
const peliculasDirectory = path.join(process.cwd(), 'content', 'peliculas');

export interface ArticleData {
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  author: string;
  imageUrl: string;
  readTime: string;
  slug: string;
}

export interface MovieData extends ArticleData {
  engine: string;
  horsepower: string;
  topSpeed: string;
  modifications: string;
  movie: string;
}

export interface GenericResult<T> {
  data: T;
  content: string;
  toc: TOCItem[];
  faqSchema: any | null;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function generateSlugId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u017F]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function extractTOC(content: string): TOCItem[] {
  const headingsRegex = /^(#{2,3})\s+(.*)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingsRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlugId(text);
    toc.push({ id, text, level });
  }

  return toc;
}

export function extractFAQSchema(content: string) {
  const faqRegex = /### (.+?)\n+([^#]+)/g;
  const faqs = [];
  let match;

  if (content.includes("Preguntas Frecuentes")) {
    const faqSection = content.split("Preguntas Frecuentes")[1];
    while ((match = faqRegex.exec(faqSection)) !== null) {
      const question = match[1].trim();
      const answer = match[2].trim().replace(/\n/g, ' ');
      faqs.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      });
    }
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };
}

export function getFileSlugs(dir: string): string[] {
  ensureDirectoryExists(dir);
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.mdx')).map(file => file.replace(/\.mdx$/, ''));
}

export function getArticleSlugs() { return getFileSlugs(contentDirectory); }
export function getMovieSlugs() { return getFileSlugs(peliculasDirectory); }

export function getDocumentBySlug<T>(dir: string, slug: string): GenericResult<T> | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(dir, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    const toc = extractTOC(content);
    const faqSchema = extractFAQSchema(content);

    return {
      data: { ...data, slug: realSlug } as T,
      content,
      toc,
      faqSchema
    };
  } catch (e) {
    return null;
  }
}

export function getArticleBySlug(slug: string) { return getDocumentBySlug<ArticleData>(contentDirectory, slug); }
export function getMovieBySlug(slug: string) { return getDocumentBySlug<MovieData>(peliculasDirectory, slug); }

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is GenericResult<ArticleData> => article !== null)
    .map(article => article.data)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getAllMovies(): MovieData[] {
  const slugs = getMovieSlugs();
  return slugs
    .map((slug) => getMovieBySlug(slug))
    .filter((movie): movie is GenericResult<MovieData> => movie !== null)
    .map(movie => movie.data)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getCategories() {
  const articles = getAllArticles();
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    slug: generateSlugId(name),
    count
  }));
}
