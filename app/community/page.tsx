"use client";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#00272c] text-white px-4 sm:px-6 md:px-10 py-16">

      <div className="max-w-4xl mx-auto">

        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">
          Community <span className="text-[#e1ff51]">Feed</span>
        </h1>

        <p className="text-center text-white/60 mt-3 text-sm sm:text-base">
          See what creators are sharing
        </p>

        
        <div className="mt-10 md:mt-14 space-y-4 sm:space-y-5">

          {[1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-[#e1ff51] text-sm">@creator{i}</p>
              <p className="mt-2 text-white/80 text-sm sm:text-base">
                Just dropped a new track 🔥 vibing with this sound!
              </p>
              <p className="text-xs text-white/40 mt-2">2h ago</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}