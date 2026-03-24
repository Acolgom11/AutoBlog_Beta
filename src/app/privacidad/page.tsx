import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | AutoBlog",
  description: "Nuestra política de privacidad y manejo de datos de usuarios.",
};

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Política de Privacidad</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          En AutoBlog, nos tomamos muy en serio tu privacidad. Esta política describe qué información
          recopilamos y cómo la utilizamos para mejorar tu experiencia de lectura en nuestra plataforma.
        </p>

        <h2>1. Información que recopilamos</h2>
        <p>
          Recopilamos información básica no identificativa sobre tu dispositivo y comportamiento de 
          navegación (analíticas locales almacenadas en el navegador mediante <code className="bg-muted px-1.5 py-0.5 rounded">localStorage</code>) para 
          fines de funcionalidad (como contar visualizaciones de artículos). No rastreamos datos personales sensibles.
        </p>

        <h2>2. Uso de cookies y almacenamiento local</h2>
        <p>
          Utilizamos <strong>localStorage</strong> y cookies estrictamente necesarias para recordar tus preferencias de tema (modo oscuro o claro) 
          y las interacciones básicas en la página, sin ceder información a terceros. 
        </p>

        <h2>3. Publicidad y terceros</h2>
        <p>
          Este sitio web utiliza servicios de publicidad para mantener nuestro contenido gratuito.
          Dichos socios pueden procesar datos anónimos para personalizar los anuncios bajo sus estrictas normativas.
        </p>

        <h2>4. Cambios a esta política</h2>
        <p>
          Nos reservamos el derecho de modificar esta política en cualquier momento para mantenernos alineados con las regulaciones de la UE (RGPD). Cualquier cambio se reflejará en esta misma página con una fecha actualizada.
        </p>
        
        <p className="mt-8 text-sm text-muted-foreground italic">
          Última actualización: 21 de marzo de 2026.
        </p>
      </div>
    </div>
  );
}
