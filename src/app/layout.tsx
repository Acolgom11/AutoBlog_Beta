import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.autoblog.com"),
  title: {
    default: "AutoBlog | Tu Guía Automotriz Definitiva",
    template: "%s | AutoBlog"
  },
  description: "Blog especializado en automóviles, vehículos eléctricos, reseñas exhaustivas, guías de compra detalladas y recracciones de coches de películas icónicas.",
  openGraph: {
    title: "AutoBlog | Tu Guía Automotriz Definitiva",
    description: "Blog especializado en automóviles, reseñas deportivas y coches de películas.",
    url: "https://www.autoblog.com",
    siteName: "AutoBlog",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AutoBlog Open Graph Image"
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBlog | Tu Guía Automotriz Automotriz Definitiva",
    description: "Conéctate a las últimas metodologías de compra, reseñas de EVs y guías.",
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
