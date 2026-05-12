"use client";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-80 md:h-105 flex items-center justify-center overflow-hidden">

      
      <div className="absolute w-75 h-75 bg-[#e1ff51] opacity-20 blur-[120px] rounded-full animate-pulse"></div>

      
      <div className="absolute w-10 h-10 bg-[#e1ff51] rounded-full top-10 left-10 animate-bounce opacity-70"></div>
      <div className="absolute w-6 h-6 bg-[#e1ff51] rounded-full bottom-10 right-16 animate-bounce delay-150 opacity-50"></div>
      <div className="absolute w-8 h-8 bg-[#e1ff51] rounded-full top-20 right-20 animate-bounce delay-300 opacity-60"></div>

      
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-6 rounded-2xl text-center shadow-xl animate-pulse">

        <p className="text-[#e1ff51] text-sm font-semibold">Now Streaming</p>
        <h2 className="text-[#00272c] text-xl font-extrabold mt-1 px-20">lerryMusic</h2>

        
        <div className="flex gap-1 justify-center mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-6 bg-[#e1ff51] animate-bounce"
              style={{ animationDelay: `${i * 0.1}s `}}
            />
          ))}
        </div>

      </div>

    </div>
  );
}