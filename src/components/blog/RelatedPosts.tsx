import { ArticleCard } from "@/components/ui/ArticleCard";
import { ArticleData } from "@/lib/mdx";

export function RelatedPostsSkeleton() {
  return (
    <div className="mt-20 pt-16 border-t border-border">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
        <span className="bg-brand w-2 h-8 rounded-full inline-block"></span>
        Artículos Relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="h-[300px] bg-muted/40 animate-pulse rounded-xl" />
        <div className="h-[300px] bg-muted/40 animate-pulse rounded-xl hidden md:block" />
        <div className="h-[300px] bg-muted/40 animate-pulse rounded-xl hidden lg:block" />
      </div>
    </div>
  );
}

export default function RelatedPosts({ articles }: { articles: ArticleData[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-border">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
        <span className="bg-brand w-2 h-8 rounded-full inline-block"></span>
        Artículos Relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
           <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
