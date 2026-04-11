export default function GameLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
        <div className="space-y-6">
          <div className="aspect-video bg-white/5 rounded-xl" />
          <div className="bg-white/5 rounded-xl p-6 space-y-4">
            <div className="h-7 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-5/6" />
          </div>
        </div>
        <aside className="hidden lg:block space-y-4">
          <div className="h-64 bg-white/5 rounded-xl" />
        </aside>
      </div>
    </div>
  );
}
