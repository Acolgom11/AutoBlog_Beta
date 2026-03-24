import { supabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { Post } from '@/types/post';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const session = await verifySession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    return <div>Post no encontrado</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Editar post</h1>
      <PostForm initialData={post} isEditing postId={id} />
    </div>
  );
}