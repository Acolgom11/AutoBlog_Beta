export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar (opcional, puedes ponerlo después) */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}