import { Metadata } from "next";
import { getAllMovies, MovieData } from "@/lib/mdx";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Coches de Películas | AutoBlog",
  description: "Explora la historia, modificaciones y fichas técnicas de los coches más icónicos del cine.",
};

function MovieCard({ title, description, imageUrl, slug, movie, date }: MovieData) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/peliculas/${slug}`} className="block overflow-hidden h-48 relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-brand text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 z-10">
          <Film className="w-3.5 h-3.5" />
          {movie}
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <Link href={`/peliculas/${slug}`}>
            <h3 className="font-bold leading-tight hover:text-brand transition-colors text-xl">
              {title}
            </h3>
          </Link>
          <p className="mt-3 text-muted-foreground line-clamp-3 text-sm">
            {description}
          </p>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <time dateTime={date}>{date}</time>
        </div>
      </div>
    </article>
  );
}

export default function PeliculasIndex() {
  const movies = getAllMovies();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Películas", href: "/peliculas" }]} />
      
      <AdComponent slotId="peliculas-top-banner" className="mb-10" />

      <header className="mb-12 border-b border-border pb-8 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Coches de Películas</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
          Descubre todo sobre los vehículos más legendarios de la gran pantalla. Fichas técnicas reales, historias de rodaje y modificaciones extremas.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {movies.map((movie) => (
               <MovieCard key={movie.slug} {...movie} />
             ))}
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
