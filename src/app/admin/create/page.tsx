import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';

export default async function CreatePostPage() {
  const session = await verifySession();
  if (!session) redirect('/admin/login');

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Crear nuevo post</h1>
      <PostForm />
    </div>
  );
}