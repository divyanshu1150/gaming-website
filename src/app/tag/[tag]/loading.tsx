export default function TagLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-pulse">
      <div className="h-4 bg-white/5 rounded w-48" />
      <div className="h-8 bg-white/5 rounded w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl overflow-hidden">
            <div className="aspect-video bg-white/5" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-white/10 rounded w-3/4" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
