"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroVisual from "./components/HeroVisual";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const theme = {
    bg: darkMode ? "#00272c" : "#f6f8f8",
    text: darkMode ? "#ffffff" : "#00272c",
    muted: darkMode ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
    card: darkMode ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  

  return (
    <div
      style={{ background: theme.bg, color: theme.text }}
      className="min-h-screen transition-all duration-500"
    >
      
      <nav
        className="flex justify-between items-center px-6 md:px-10 py-5 border-b"
        style={{ borderColor: theme.border, backdropFilter: "blur(12px)" }}
      >
        <h1 className="text-xl font-bold text-[#e1ff51]">
          lerryMusic
        </h1>

        <div className="hidden md:flex gap-8 font-bold text-sm" style={{ color: theme.muted }}>
          <button className="hover:text-[#e1ff51] " onClick={() => router.push("/features")}>Features</button>
          <button className="hover:text-[#e1ff51] " onClick={() => router.push("/explore")}>Explore</button>
          <button className="hover:text-[#e1ff51] "  onClick={() => router.push("/community")}>Community</button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg border text-sm"
            style={{ borderColor: theme.border }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => router.push("/auth")}
            className="bg-[#e1ff51] text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      
      <section className="flex flex-col items-center text-center px-6 md:px-10 pt-20 md:pt-28 pb-32 relative overflow-hidden">

        
        <div className="absolute w-150 h-150 bg-[#e1ff51] opacity-10 blur-[160px] rounded-full top-0 pointer-events-none"></div>

        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight z-10">
          Music that <br />
          <span className="text-[#e1ff51]">connects creators</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg z-10" style={{ color: theme.muted }}>
          Upload your sound, discover new artists, and connect through music.
          A simple space for real creators.
        </p>

        
        <div className="flex flex-col md:flex-row gap-4 mt-10 z-10">

          <button
            onClick={() => router.push("/upload")}
            className="bg-[#e1ff51] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Start Uploading
          </button>

          <button
          onClick={() => router.push("/explore")}
            className="px-8 py-3 rounded-xl border hover:border-[#e1ff51] transition"
            style={{ borderColor: theme.border }}
          >
            Explore Music
          </button>

        </div>

        
        <div className="relative z-10 mt-20">
          <HeroVisual />
        </div>

      </section>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10 pb-24 max-w-6xl mx-auto">

        {[
          ["Upload Instantly", "Share music in seconds with zero friction."],
          ["Discover Sound", "Find music that matches your vibe."],
          ["Connect", "Chat and interact with creators worldwide."],
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border hover:scale-[1.02] transition"
            style={{
              background: theme.card,
              borderColor: theme.border,
            }}
          >
            <h3 className="text-[#e1ff51] font-semibold mb-2">
              {item[0]}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
              {item[1]}
            </p>
          </div>
        ))}

      </section>

      
      <section className="text-center pb-24 px-6">

        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to share your sound?
        </h2>

        <p className="mt-4 mb-8" style={{ color: theme.muted }}>
          Join lerryMusic and start building your audience today.
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="bg-[#e1ff51] text-black px-10 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>

      </section>
    </div>
  );
}