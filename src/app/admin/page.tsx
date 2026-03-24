import { supabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types/post';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminDashboard() {
  const session = await verifySession();
  if (!session) redirect('/admin/login');

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error al cargar los posts</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Crear nuevo post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {posts?.map((post: Post) => (
              <tr key={post.id}>
                <td className="whitespace-nowrap px-6 py-4">{post.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{post.category}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="mr-3 text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </Link>
                  <DeleteButton postId={post.id} />
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No hay posts todavía. ¡Crea el primero!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}