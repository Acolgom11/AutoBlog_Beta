import { AdComponent } from "../ads/AdComponent";
import { Newsletter } from "../ui/Newsletter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/mdx";

export function Sidebar() {
  const categories = getCategories();

  return (
    <aside className="space-y-8 lg:w-80 flex-shrink-0 w-full hidden md:block">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Categorías</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
             <li key={category.name}>
                <Link href={`/categorias/${category.slug}`} className="group flex items-center justify-between py-1 transition-colors">
                  <span className="text-muted-foreground group-hover:text-brand font-medium">{category.name}</span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-0.5 rounded-full mr-2 group-hover:bg-brand/10 group-hover:text-brand transition-colors">{category.count}</span>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </span>
                </Link>
             </li>
          ))}
        </ul>
      </div>

      <Newsletter />

      <div className="sticky top-24">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-center">Patrocinado</h3>
          <AdComponent slotId="sidebar-1" className="!my-0 w-full" />
        </div>
      </div>
    </aside>
  );
}
