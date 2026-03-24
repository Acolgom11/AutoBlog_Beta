import { remark } from 'remark';
import strip from 'strip-markdown';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export async function extractToc(content: string): Promise<TocItem[]> {
  // Generar IDs para encabezados (similar a rehype-slug)
  const lines = content.split('\n');
  const toc: TocItem[] = [];
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      toc.push({ id, text, level });
    }
  }
  return toc;
}