"use client";

import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <div className="bg-brand/10 border border-brand/20 rounded-xl p-6 shadow-sm my-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-brand" />
        <h3 className="font-bold text-lg text-foreground">Suscríbete al Boletín</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Recibe las últimas reseñas, guías de compra y noticias del motor directamente en tu correo.
      </p>
      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          required
        />
        <button
          type="submit"
          className="w-full h-10 bg-brand text-white font-medium rounded-md hover:bg-brand-hover transition-colors shadow-sm"
        >
          Suscribirme
        </button>
      </form>
    </div>
  );
}
