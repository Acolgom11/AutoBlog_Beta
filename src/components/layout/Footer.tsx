import Link from "next/link";
import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-brand" />
            <span className="font-bold text-xl tracking-tight">AutoBlog</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tu fuente definitiva de reseñas objetivas, noticias del motor y guías de compra exhaustivas.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Categorías</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/categorias/resenas-de-coches" className="hover:text-brand transition-colors">Reseñas de Coches</Link></li>
            <li><Link href="/categorias/vehiculos-electricos" className="hover:text-brand transition-colors">Vehículos Eléctricos</Link></li>
            <li><Link href="/categorias/opciones-economicas" className="hover:text-brand transition-colors">Opciones Económicas</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Compañía</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/sobre-mi" className="hover:text-brand transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/contact" className="hover:text-brand transition-colors">Contacto</Link></li>
            <li><Link href="/privacidad" className="hover:text-brand transition-colors">Política de Privacidad</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Síguenos</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-brand transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AutoBlog. Todos los derechos reservados.
      </div>
    </footer>
  );
}
