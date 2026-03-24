"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

interface SearchArticle {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  slug: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState<SearchArticle[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      const filtered = articles.filter(
        a => 
          a.title.toLowerCase().includes(lowerQuery) || 
          a.description.toLowerCase().includes(lowerQuery) ||
          a.category.toLowerCase().includes(lowerQuery) ||
          (a.keywords && a.keywords.some(k => k.toLowerCase().includes(lowerQuery)))
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, articles]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.length >= 2) setIsOpen(true) }}
          className="h-9 w-full sm:w-64 rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-12 right-0 w-full sm:w-80 rounded-md border border-border bg-card shadow-lg z-50 overflow-hidden">
          <ul className="max-h-[300px] overflow-auto py-2">
            {results.map(article => (
              <li key={article.slug}>
                <Link 
                  href={`/blog/${article.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                >
                  <div className="font-medium text-sm text-foreground line-clamp-1">{article.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.category}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-12 right-0 w-full sm:w-80 rounded-md border border-border bg-card shadow-lg z-50 p-4 text-center text-sm text-muted-foreground">
          No se encontraron artículos para &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
