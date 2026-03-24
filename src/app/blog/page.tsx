import { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

// Función auxiliar para estimar tiempo de lectura (opcional)
const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

export const metadata: Metadata = {
  title: "All Articles | AutoBlog",
  description: "Browse all our automotive reviews, guides, and news.",
};

export default async function BlogIndex() {
  const { data: posts, error } = await supabasePublic
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const articles = posts?.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.content ? post.content.substring(0, 160) : '',
    date: post.created_at,
    imageUrl: post.image || '/placeholder.jpg',  // ✅ usa imageUrl, fallback si no hay
    category: post.category,
    readTime: post.content ? calculateReadTime(post.content) : '1 min read',
  })) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Artículos", href: "/blog" }]} />
      <AdComponent slotId="blog-top-banner" className="mb-10" />
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">All Articles</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Catch up on the latest automotive news, in-depth reviews, and comprehensive buying guides.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row gap-12">
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
          
          {articles.length > 0 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <span className="px-4 py-2 bg-brand text-white rounded-md text-sm font-medium shadow-sm">1</span>
              <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors bg-card" disabled>
                Next
              </button>
            </div>
          )}
        </main>

        <Sidebar />
      </div>
    </div>
  );
}