'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/20 w-24 h-24 flex items-center justify-center mb-8 shadow-sm border border-red-200 dark:border-red-900/50">
        <span className="text-4xl" role="img" aria-label="Advertencia">⚠️</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Avería Inesperada</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Algo ha fallado en el motor de la web. Por favor, intenta de nuevo o vuelve a la ruta principal.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} className="font-bold py-6 px-8 rounded-full text-lg shadow-sm">
          Intentar arrancar de nuevo
        </Button>
        <Button 
          onClick={() => window.location.href = '/'} 
          className="font-bold py-6 px-8 rounded-full text-lg shadow-sm bg-transparent text-foreground border border-border hover:bg-muted"
        >
          Ir al Inicio
        </Button>
      </div>
    </div>
  );
}
