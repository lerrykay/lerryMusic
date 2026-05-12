"use client";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#00272c] text-white px-4 sm:px-6 md:px-10 py-16 md:py-24">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Built for <span className="text-[#e1ff51]">Creators</span>
        </h1>

        <p className="text-white/60 mt-4 text-sm sm:text-base">
          Everything you need to upload, share, and grow your music.
        </p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mt-10 md:mt-16 text-left">

          {[
            ["Instant Upload", "Upload music in seconds"],
            ["Smart Discovery", "Find your perfect audience"],
            ["Global Reach", "Share music worldwide"],
            ["Analytics", "Track your growth"],
            ["Community", "Connect with creators"],
            ["Fast Streaming", "Smooth playback experience"],
          ].map((f, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 md:hover:scale-105 transition"
            >
              <h3 className="text-[#e1ff51] font-semibold">{f[0]}</h3>
              <p className="text-white/60 mt-2 text-sm">{f[1]}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}