import { MetadataRoute } from "next";
import { getAllArticles, getCategories, getAllMovies } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.autoblog.com";

  const articlesObj = getAllArticles();
  const categoriesObj = getCategories();
  const moviesObj = getAllMovies();

  const articles = articlesObj.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categories = categoriesObj.map((category) => ({
    url: `${baseUrl}/categorias/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const movies = moviesObj.map((movie) => ({
    url: `${baseUrl}/peliculas/${movie.slug}`,
    lastModified: new Date(movie.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/peliculas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...categories,
    ...articles,
    ...movies,
  ];
}
