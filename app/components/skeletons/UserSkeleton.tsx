export function UserSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-white/10" />
      <div className="space-y-2">
        <div className="h-3 w-24 bg-white/10 rounded" />
        <div className="h-2 w-16 bg-white/10 rounded" />
      </div>
    </div>
  );
}