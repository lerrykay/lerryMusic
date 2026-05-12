export function SongSkeleton() {
  return (
    <div className="p-4 bg-white/5 rounded-xl animate-pulse space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  );
}