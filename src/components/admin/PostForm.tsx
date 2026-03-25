'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';
import { 
  Bold, Italic, Link as LinkIcon, Image as ImageIcon, 
  Code, List, Heading2, Heading3, 
  Loader2, Save, ArrowLeft,
  CheckCircle2, XCircle, LayoutTemplate
} from 'lucide-react';

interface PostFormProps {
  initialData?: Partial<Post>;
  isEditing?: boolean;
  postId?: string;
}

export default function PostForm({ initialData = {}, isEditing = false, postId }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    category: initialData.category || '',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
    image: initialData.image || '',
    published: initialData.published !== undefined ? initialData.published : false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = type === 'checkbox' ? e.target.checked : undefined;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const insertTextAtCursor = (prefix: string, suffix: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent = 
      formData.content.substring(0, start) + 
      replacement + 
      formData.content.substring(end);
      
    setFormData((prev) => ({ ...prev, content: newContent }));
    
    // Enfocar nuevamente de forma asíncrona para que React actualice primero el cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: <Bold size={18} />, label: 'Negrita', onClick: () => insertTextAtCursor('**', '**') },
    { icon: <Italic size={18} />, label: 'Cursiva', onClick: () => insertTextAtCursor('*', '*') },
    { icon: <Heading2 size={18} />, label: 'H2', onClick: () => insertTextAtCursor('\n## ', '\n') },
    { icon: <Heading3 size={18} />, label: 'H3', onClick: () => insertTextAtCursor('\n### ', '\n') },
    { icon: <LinkIcon size={18} />, label: 'Enlace', onClick: () => insertTextAtCursor('[', '](url)') },
    { icon: <ImageIcon size={18} />, label: 'Imagen', onClick: () => insertTextAtCursor('![alt]', '(url de la imagen)') },
    { icon: <List size={18} />, label: 'Lista', onClick: () => insertTextAtCursor('\n- ', '') },
    { icon: <Code size={18} />, label: 'Código', onClick: () => insertTextAtCursor('```\n', '\n```') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    const url = isEditing ? `/api/posts/${postId}` : '/api/posts';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al guardar el post');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Error de conexión al guardar el post');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 w-full pb-12">
      {/* Columna Principal - Editor */}
      <div className="flex-1 space-y-6">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium shadow-sm">
            <XCircle size={20} />
            {error}
          </div>
        )}

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
          {/* Editor Header / Title */}
          <div className="p-6 md:p-8 border-b border-border bg-muted/20">
            <input
              type="text"
              name="title"
              placeholder="Escribe un título increíble aquí..."
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent text-3xl md:text-5xl font-extrabold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 tracking-tight"
            />
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-3 bg-muted/40 border-b border-border sticky top-0 z-10 backdrop-blur-sm">
            {toolbarButtons.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={btn.onClick}
                title={btn.label}
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition-all shadow-sm border border-transparent hover:border-border"
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Editor Textarea */}
          <div className="p-0 flex-1 relative bg-background">
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-muted/20 border-r border-border/50 hidden md:block"></div>
            <textarea
              ref={textareaRef}
              name="content"
              placeholder="# Comienza a escribir el contenido en formato Markdown / MDX..."
              value={formData.content}
              onChange={handleChange}
              className="w-full h-full min-h-[600px] p-6 md:pl-16 bg-transparent text-foreground font-mono text-[16px] leading-[1.8] resize-y focus:outline-none placeholder:text-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      {/* Sidebar - Meta */}
      <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
        
        {/* Publish Actions Block */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
            <Save size={20} className="text-brand" />
            Publicación
          </h3>
          
          <div className="flex items-center justify-between mb-8 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex flex-col">
              <span className="font-bold text-sm mb-1">Visibilidad</span>
              <span className="text-xs text-muted-foreground font-medium">
                {formData.published ? 'Público a todos' : 'Oculto (Borrador)'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="published" 
                className="sr-only peer" 
                checked={formData.published}
                onChange={handleChange}
              />
              <div className="w-12 h-7 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500 shadow-inner"></div>
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3.5 text-white hover:bg-brand-hover font-bold text-[15px] transition-all disabled:opacity-70 shadow-sm"
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> Guardando...</>
              ) : (
                <><CheckCircle2 size={18} /> {isEditing ? 'Actualizar Artículo' : 'Publicar Artículo'}</>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-foreground hover:bg-muted font-semibold transition-all shadow-sm"
              disabled={isSubmitting}
            >
              <ArrowLeft size={18} /> Volver al panel
            </button>
          </div>
        </div>

        {/* Taxonomy Block */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
            <LayoutTemplate size={20} className="text-muted-foreground" />
            Metadatos
          </h3>
          
          <div>
            <label className="block text-sm font-bold mb-2">
              Categoría Principal
            </label>
            <input
              type="text"
              name="category"
              placeholder="Ej: Coches Eléctricos"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Etiquetas (Tags)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="deportivos, reseña, bmw..."
              value={formData.tags}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow shadow-sm"
            />
            <p className="text-[13px] text-muted-foreground mt-2 font-medium">Separa las etiquetas por comas para mejorar el SEO.</p>
          </div>
        </div>

        {/* Cover Image Block */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
            <ImageIcon size={20} className="text-muted-foreground" />
            Portada
          </h3>
          
          <div>
            <label className="block text-sm font-bold mb-2">
              URL de la imagen destacada
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow shadow-sm"
            />
          </div>

          {formData.image ? (
            <div className="mt-4 relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-border shadow-inner">
              <img 
                src={formData.image} 
                alt="Vista previa de portada" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Error+al+cargar+imagen';
                }}
              />
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center justify-center p-8 bg-muted/40 rounded-lg border border-dashed border-border text-muted-foreground text-center">
              <ImageIcon size={32} className="mb-3 opacity-50" />
              <span className="text-sm font-medium">La imagen de portada aparecerá aquí</span>
            </div>
          )}
        </div>

      </div>
    </form>
  );
}