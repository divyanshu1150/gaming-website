export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-64 bg-white/5 rounded-2xl" />
      {/* Categories skeleton */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-white/5 rounded-xl" />
        ))}
      </div>
      {/* Grid skeleton */}
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
