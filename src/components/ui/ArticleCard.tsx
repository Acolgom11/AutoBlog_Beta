import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
  featured?: boolean;
}

export function ArticleCard({
  title,
  description,
  category,
  date,
  readTime,
  imageUrl,
  slug,
  featured = false,
}: ArticleCardProps) {
  return (
    <article className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md ${featured ? "md:grid md:grid-cols-2 md:gap-6" : ""}`}>
      <Link href={`/blog/${slug}`} className={`block overflow-hidden ${featured ? "h-64 md:h-full" : "h-48"}`}>
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            {category}
          </span>
          <Link href={`/blog/${slug}`}>
            <h3 className={`mt-3 font-bold leading-tight hover:text-brand transition-colors ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
              {title}
            </h3>
          </Link>
          <p className="mt-3 text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            <time dateTime={date}>{date}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
