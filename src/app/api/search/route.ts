import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/mdx';
import { supabasePublic } from '@/lib/supabasePublic';

export async function GET() {
  const mdxArticles = getAllArticles();
  
  const mdxIndex = mdxArticles.map(a => ({
    title: a.title,
    description: a.description,
    category: a.category,
    keywords: a.keywords,
    slug: a.slug
  }));

  const { data: sbPosts } = await supabasePublic.from('posts').select('slug, title, content, category, tags').eq('published', true);

  const sbIndex = (sbPosts || []).map(p => ({
    title: p.title,
    description: p.content ? p.content.substring(0, 160) : '',
    category: p.category || 'General',
    keywords: p.tags || [],
    slug: p.slug
  }));

  const combined = [...mdxIndex, ...sbIndex];

  // Remove duplicate slugs
  const finalIndex = Array.from(new Map(combined.map(item => [item.slug, item])).values());

  return NextResponse.json(finalIndex);
}
