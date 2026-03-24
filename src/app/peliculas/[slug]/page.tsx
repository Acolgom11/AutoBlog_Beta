import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { CalendarDays, Clock, User, Cog, Film, Zap, Gauge } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { getMovieBySlug, getMovieSlugs } from "@/lib/mdx";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Sidebar } from "@/components/layout/Sidebar";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Ad } from "@/components/mdx/Ad";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = getMovieSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const movie = getMovieBySlug(resolvedParams.slug);
  if (!movie) return { title: "Película No Encontrada" };

  return {
    title: `${movie.data.title} | AutoBlog Películas`,
    description: movie.data.description,
    openGraph: {
      title: movie.data.title,
      description: movie.data.description,
      images: [movie.data.imageUrl],
      type: "article",
    },
  };
}

export default async function MoviePost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const movieResult = getMovieBySlug(resolvedParams.slug);

  if (!movieResult) {
    notFound();
  }

  const { data, content, toc, faqSchema } = movieResult;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: data.imageUrl,
    datePublished: new Date(data.date).toISOString(),
    author: {
      "@type": "Person",
      name: data.author,
    },
  };
  
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.autoblog.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Películas",
        "item": "https://www.autoblog.com/peliculas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.title,
        "item": `https://www.autoblog.com/peliculas/${data.slug}`
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <Breadcrumbs
        items={[
          { label: "Películas", href: `/peliculas` },
          { label: data.title, href: `/peliculas/${data.slug}` },
        ]}
      />

      <AdComponent slotId="peliculas-top-banner" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1 max-w-3xl min-w-0">
          <header className="mb-8 space-y-4">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider flex items-center justify-center gap-1 w-max">
              <Film className="w-3.5 h-3.5" />
              {data.movie}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">{data.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={data.date}>{data.date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{data.readTime}</span>
              </div>
            </div>
          </header>

          <figure className="mb-10 w-full relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm">
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </figure>

          {/* Custom Specification Dashboard for Movies */}
          <div className="bg-card border border-border shadow-sm rounded-xl p-8 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <h2 className="text-2xl font-extrabold sm:col-span-2 mb-2 border-b border-border pb-4 tracking-tight">Ficha Técnica Oficial</h2>
            
            <div className="flex items-start gap-4">
               <div className="bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Cog className="w-6 h-6 text-brand" />
               </div>
               <div>
                  <dt className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">Motor</dt>
                  <dd className="font-semibold text-foreground text-lg">{data.engine}</dd>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-brand" />
               </div>
               <div>
                  <dt className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">Potencia</dt>
                  <dd className="font-semibold text-foreground text-lg">{data.horsepower}</dd>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Gauge className="w-6 h-6 text-brand" />
               </div>
               <div>
                  <dt className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">Velocidad Máxima</dt>
                  <dd className="font-semibold text-foreground text-lg">{data.topSpeed}</dd>
               </div>
            </div>

            <div className="flex items-start gap-4 sm:col-span-2">
               <div className="bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-bold text-brand text-xl">🔧</span>
               </div>
               <div className="flex-1">
                  <dt className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">Modificaciones Principales</dt>
                  <dd className="font-medium text-foreground text-lg leading-relaxed bg-muted/50 p-4 rounded-lg border border-border/50">{data.modifications}</dd>
               </div>
            </div>
          </div>

          <div className="md:hidden">
            <TableOfContents items={toc} />
          </div>

          <div className="float-right ml-8 mb-4 hidden md:block max-w-xs w-full shrink-0">
             <TableOfContents items={toc} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand hover:prose-a:text-brand-hover prose-headings:scroll-mt-24 prose-table:w-full prose-table:min-w-full prose-th:bg-muted/50 prose-th:p-4 prose-td:p-4 prose-td:border-b prose-td:border-border">
             <MDXRemote 
                source={content} 
                components={{ Ad }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  }
                }}
             />
          </div>

          <AdComponent slotId="article-bottom" className="mt-16 mb-8" />
        </article>

        <Sidebar />
      </div>
    </div>
  );
}
