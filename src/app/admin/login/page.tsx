'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { User, Lock, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(login, null);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin');
    }
  }, [state, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background relative overflow-hidden transition-colors">
      
      {/* Elementos de decoración de fondo (Glassmorphism blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-brand/10 dark:bg-brand/5 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[80px]"></div>
      </div>

      <div className="w-full max-w-[420px] px-6 z-10 my-12">
        
        {/* Logo superior */}
        <div className="mb-10 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/" className="inline-flex items-center gap-3 text-brand font-extrabold text-2xl hover:opacity-80 transition-opacity">
            <div className="bg-brand text-white p-2.5 rounded-xl shadow-md rotate-[-5deg] hover:rotate-0 transition-transform">
              <Car size={26} strokeWidth={2.5} />
            </div>
            AutoBlog
          </Link>
        </div>

        {/* Tarjeta de Login */}
        <div className="rounded-2xl bg-card border border-border shadow-xl dark:shadow-2xl overflow-hidden p-8 sm:p-10 transition-all animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Acceso Seguro</h1>
            <p className="text-sm text-muted-foreground font-medium">Panel de Administración CMS</p>
          </div>
          
          <form action={formAction} className="space-y-6">
            <div className="space-y-5">
              {/* Usuario */}
              <div>
                <label htmlFor="username" className="mb-2 block text-[13px] font-bold uppercase tracking-wider text-muted-foreground">
                  Usuario
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-brand">
                    <User className="h-5 w-5 text-muted-foreground/70 group-focus-within:text-brand transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Tu usuario"
                    className="block w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-4 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all placeholder:text-muted-foreground/50 font-medium"
                  />
                </div>
              </div>
              
              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="mb-2 block text-[13px] font-bold uppercase tracking-wider text-muted-foreground">
                  Contraseña
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-brand">
                    <Lock className="h-5 w-5 text-muted-foreground/70 group-focus-within:text-brand transition-colors" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-4 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-all placeholder:text-muted-foreground/50 font-medium tracking-widest"
                  />
                </div>
              </div>

              {/* Keep session (opcional, manda el field si el backend lo soporta, o simplemente da confianza visual) */}
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-brand focus:ring-brand bg-background"
                />
                <label htmlFor="remember" className="ml-2 block text-sm font-medium text-muted-foreground">
                  Mantener sesión iniciada
                </label>
              </div>
            </div>

            {/* Mensaje de Error */}
            {state?.error && (
              <div className="animate-in fade-in zoom-in duration-300 rounded-xl bg-red-50 dark:bg-red-900/20 p-4 border border-red-100 dark:border-red-900/50">
                <p className="text-sm font-bold text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-2">
                  <span className="bg-red-200 dark:bg-red-900/50 rounded-full w-5 h-5 flex items-center justify-center text-xs">!</span>
                  {state.error}
                </p>
              </div>
            )}
            
            {/* Botón de acceso */}
            <button
              type="submit"
              disabled={pending}
              className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-brand py-4 px-4 text-[15px] font-bold text-white transition-all hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-brand/20 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              {pending ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-[18px] w-[18px] relative z-10" />
                  <span className="relative z-10 tracking-wide">Acceder al Panel</span>
                  <ArrowRight className="h-[18px] w-[18px] absolute right-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-10 text-center text-[12px] font-medium text-muted-foreground flex items-center justify-center gap-1.5 opacity-80 animate-in fade-in duration-700">
          <ShieldCheck size={14} />
          Acceso encriptado y restringido a administradores.
        </p>
      </div>
      
      {/* Definir la animación shimmer en globals o inline, usaremos un truco de tailwind puro en su lugar si no está definido en tailwind.config: */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(150%) skewX(-20deg);
          }
        }
      `}} />
    </div>
  );
}