import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, content, category, tags, image, published } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
  }

  if (!content || typeof content !== 'string' || content.trim().length < 50) {
    return NextResponse.json({ error: 'El contenido debe tener al menos 50 caracteres' }, { status: 400 });
  }

  // Generar slug automáticamente
  const slug = generateSlug(title);

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      content,
      category,
      tags,
      image,
      published: published || false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}