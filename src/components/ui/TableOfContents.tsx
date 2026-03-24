import { TOCItem } from "@/lib/mdx";

export function TableOfContents({ items }: { items: TOCItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10 w-full shadow-sm sticky top-24">
      <h2 className="font-bold text-lg mb-4 text-foreground">Tabla de Contenidos</h2>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
            className="leading-tight"
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-brand transition-colors font-medium decoration-brand underline-offset-4 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
