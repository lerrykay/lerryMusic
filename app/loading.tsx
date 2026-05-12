export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xl z-50">

      
      <div className="absolute w-72 h-72 bg-[#e1ff51]/20 blur-3xl rounded-full animate-pulse" />

      
      <div className="relative flex flex-col items-center gap-4">

        
        <div className="w-14 h-14 border-4 border-[#e1ff51]/30 border-t-[#e1ff51] rounded-full animate-spin" />

        
        <p className="text-white/60 text-sm tracking-wide">
          Loading...
        </p>

      </div>

    </div>
  );
}