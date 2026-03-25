export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      <div className="flex">
        {/* Sidebar (opcional, puedes ponerlo después) */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}