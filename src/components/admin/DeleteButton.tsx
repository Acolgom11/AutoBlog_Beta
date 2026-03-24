'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ postId }: { postId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Error al eliminar el post');
    }
    setIsDeleting(false);
    setIsConfirming(false);
  };

  if (isConfirming) {
    return (
      <span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="mr-2 text-red-600 hover:text-red-900"
        >
          {isDeleting ? 'Eliminando...' : 'Confirmar'}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="text-red-600 hover:text-red-900"
    >
      Eliminar
    </button>
  );
}