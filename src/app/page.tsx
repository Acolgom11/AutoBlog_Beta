
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdComponent } from "@/components/ads/AdComponent";
import { getAllArticles } from "@/lib/mdx";
import Link from "next/link";

export default function Home() {
  const articles = getAllArticles();
  
  if (articles.length === 0) return <div className="container py-8">No articles found.</div>;

  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 5); // show next 4

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Ad */}
      <AdComponent slotId="home-top-banner" className="mb-12" />

      {/* Featured Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <span className="bg-brand w-2 h-8 rounded-full inline-block"></span>
          Featured Post
        </h2>
        <ArticleCard {...featuredArticle} featured />
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-brand w-1.5 h-6 rounded-full inline-block"></span>
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
            
            {articles.length > 1 && (
              <div className="mt-8 flex justify-center">
                <Link href="/blog" className="px-6 py-3 rounded-full border border-border bg-card hover:bg-brand hover:text-white hover:border-brand transition-all font-medium shadow-sm">
                  View All Articles
                </Link>
              </div>
            )}
          </section>

          {/* Middle Ad */}
          <AdComponent slotId="home-middle-feed" className="my-12" />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
