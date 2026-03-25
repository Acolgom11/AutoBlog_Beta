import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { CalendarDays, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";

import { supabasePublic } from "@/lib/supabasePublic";
import { Button } from "@/components/ui/Button";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Sidebar } from "@/components/layout/Sidebar";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Ad } from "@/components/mdx/Ad";
import { getSession } from "@/lib/session";
import dynamic from "next/dynamic";
import { RelatedPostsSkeleton } from "@/components/blog/RelatedPosts";
import { extractToc } from "@/lib/toc";
import { Post } from "@/types/post";
import { getRelatedPosts } from "@/lib/recommendations";

// Función auxiliar para calcular tiempo de lectura
const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const RelatedPosts = dynamic(() => import("@/components/blog/RelatedPosts"), {
  loading: () => <RelatedPostsSkeleton />
});

export const revalidate = 3600; // ISR validation

export async function generateStaticParams() {
  const { data: posts } = await supabasePublic
    .from('posts')
    .select('slug');
  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: post, error } = await supabasePublic
    .from('posts')
    .select('title, content, image')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return { title: "Not Found" };
  }

  // Si tienes campo description en la tabla, úsalo; si no, genera una descripción corta
  const description = post.content ? post.content.substring(0, 160) : '';

  return {
    title: `${post.title} | AutoBlog`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [post.image || ''],
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post, error } = await supabasePublic
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  if (post.published === false) {
    const session = await getSession();
    if (!session || !session.authenticated) {
      notFound();
    }
  }

  // Calcular readTime si no está en la tabla
  const readTime = post.read_time || calculateReadTime(post.content);

  // Extraer TOC del contenido
  const toc = await extractToc(post.content);

  // OBTENER POSTS RELACIONADOS: fetch todos, filter, score
  const { data: allPosts } = await supabasePublic
    .from('posts')
    .select('*')
    .eq('published', true);

  let relatedArticles: any[] = [];
  if (allPosts) {
    const recommended = getRelatedPosts(post, allPosts);
    relatedArticles = recommended.map(rel => ({
      slug: rel.slug,
      title: rel.title,
      description: rel.content ? rel.content.substring(0, 160) : '',
      date: rel.created_at,
      imageUrl: rel.image || '',
      category: rel.category,
      readTime: rel.read_time || calculateReadTime(rel.content),
      keywords: rel.tags || [],
      author: rel.author || "AutoBlog Editor",
    }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: new Date(post.created_at).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "AutoBlog Editor",
    },
  };
  
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.autoblog.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": post.category,
        "item": `https://www.autoblog.com/categorias/${post.category.toLowerCase().replace(/ /g, "-")}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.autoblog.com/blog/${post.slug}`
      }
    ]
  };

  // Preparar datos para el componente ArticleCard en RelatedPosts
  // Si RelatedPosts espera una lista de artículos con cierta estructura, ajusta aquí

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Breadcrumbs
        items={[
          { label: post.category, href: `/categorias/${post.category.toLowerCase().replace(/ /g, "-")}` },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <AdComponent slotId="article-top-banner" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1 max-w-3xl min-w-0">
          <header className="mb-8 space-y-4">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description || (post.content ? post.content.substring(0, 160) : '')}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">{post.author || "AutoBlog Editor"}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </header>

          <figure className="mb-10 w-full relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </figure>

          <div className="md:hidden">
            <TableOfContents items={toc} />
          </div>

          <div className="float-right ml-8 mb-4 hidden md:block max-w-xs w-full shrink-0">
             <TableOfContents items={toc} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand hover:prose-a:text-brand-hover prose-headings:scroll-mt-24 prose-table:w-full prose-table:min-w-full prose-th:bg-muted/50 prose-th:p-4 prose-td:p-4 prose-td:border-b prose-td:border-border">
             <MDXRemote 
                source={post.content} 
                components={{ Ad }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  }
                }}
             />
          </div>

          <div className="mt-10 mb-6 text-center">
            <Link href="/blog">
              <Button className="w-full sm:w-auto text-lg font-bold px-8 py-6 rounded-full">
                🚗 Ver Más Coches y Reseñas
              </Button>
            </Link>
          </div>

          <AdComponent slotId="article-bottom" className="mt-8 mb-8" />

          <div className="mt-12 p-8 bg-card border border-border rounded-xl flex items-start gap-6 shadow-sm">
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">About {post.author || "AutoBlog Editor"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                AutoBlog Editor is an automotive enthusiast with over 10 years of experience testing and reviewing the latest cars on the market. Focused on delivering objective, comprehensive analysis for every buyer.
              </p>
            </div>
          </div>
        </article>

        <Sidebar />
      </div>

      <RelatedPosts articles={relatedArticles} />
    </div>
  );
}