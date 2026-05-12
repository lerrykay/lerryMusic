export function CardSkeleton() {
  return (
    <div className="p-5 bg-white/5 rounded-xl animate-pulse space-y-3">
      <div className="h-4 bg-white/10 rounded w-2/3" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  );
}