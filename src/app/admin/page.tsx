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

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
          <thead className="bg-gray-50 dark:bg-zinc-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
            {posts?.map((post: Post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium dark:text-gray-200">{post.title}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-gray-100 dark:bg-zinc-800 px-2 text-xs font-semibold leading-5 text-gray-800 dark:text-gray-300">
                    {post.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {post.published ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Publicado
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      Borrador
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500 dark:text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="mr-3 font-medium text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="mr-3 font-medium text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Editar
                  </Link>
                  <DeleteButton postId={post.id} />
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
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