"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SearchBar } from "../ui/SearchBar";
import { Car, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 z-[60]">
          <Car className="h-6 w-6 text-brand" />
          <span className="font-bold text-xl tracking-tight">AutoBlog</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/blog" className="hover:text-brand transition-colors">Artículos</Link>
          <Link href="/peliculas" className="hover:text-brand transition-colors">Películas</Link>
          <Link href="/categorias/guias-de-compra" className="hover:text-brand transition-colors">Guías</Link>
          <Link href="/categorias/vehiculos-electricos" className="hover:text-brand transition-colors">Eléctricos</Link>
          <Link href="/sobre-mi" className="hover:text-brand transition-colors">Nosotros</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden z-[60]">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2 -mr-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background border-t border-border p-6 flex flex-col gap-8 md:hidden overflow-y-auto z-50 shadow-xl">
            <SearchBar />
            <nav className="flex flex-col gap-6 text-xl font-medium">
              <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors border-b border-border pb-3">Artículos</Link>
              <Link href="/peliculas" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors border-b border-border pb-3">Películas</Link>
              <Link href="/categorias/guias-de-compra" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors border-b border-border pb-3">Guías de Compra</Link>
              <Link href="/categorias/vehiculos-electricos" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors border-b border-border pb-3">Eléctricos</Link>
              <Link href="/sobre-mi" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors border-b border-border pb-3">Sobre Mí</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand transition-colors pb-3">Contacto</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
