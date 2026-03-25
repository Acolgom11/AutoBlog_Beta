import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-muted w-24 h-24 flex items-center justify-center mb-8 shadow-sm">
        <span className="text-4xl" role="img" aria-label="Construcción">🚧</span>
      </div>
      <h1 className="text-7xl font-extrabold tracking-tight mb-4 text-brand">404</h1>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Página no encontrada</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Lo sentimos, no hemos podido encontrar la página que estás buscando. Es posible que haya sido eliminada o que la URL sea incorrecta.
      </p>
      <Link href="/">
        <Button className="font-bold py-6 px-10 rounded-full text-lg shadow-sm">
          Aparcar y volver al Inicio
        </Button>
      </Link>
    </div>
  );
}
