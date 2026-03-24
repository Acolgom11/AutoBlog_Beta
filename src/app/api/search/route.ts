import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/mdx';

export async function GET() {
  const articles = getAllArticles();
  
  // Only send metadata, not full content
  const index = articles.map(a => ({
    title: a.title,
    description: a.description,
    category: a.category,
    keywords: a.keywords,
    slug: a.slug
  }));

  return NextResponse.json(index);
}
