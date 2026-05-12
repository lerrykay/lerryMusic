"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";


export default function Layout({ user, children, currentSong }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.audioUrl;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentSong]);

  
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  /* 🔐 LOGOUT */
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth");
  };

  
  if (!user) {
    return (
      <div className="min-h-screen bg-[#00272c] text-white">

        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <div className="space-y-2">
            <div className="h-5 w-40 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-20 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-20 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-20 bg-white/10 rounded-xl animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="h-40 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-40 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00272c] text-white">

      
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#00272c]/80 border-b border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg md:text-xl font-semibold">
                {greeting},{" "}
                <span className="text-[#e1ff51]">
                  {user.firstName}
                </span>
              </h1>

              <p className="text-xs text-white/40">
                Welcome back to your music space
              </p>
            </div>

          </div>

          
          <div className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-[#e1ff51]/30 cursor-pointer overflow-hidden flex items-center justify-center hover:scale-105 transition"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-black font-bold">
                  {user.firstName?.charAt(0)}
                </span>
              )}
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-xl shadow-lg overflow-hidden">

                <button
                  onClick={() => router.push("/user/edit")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit Profile
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

     
      <div className="max-w-6xl mx-auto px-6 py-6 pb-28">
        {children}
      </div>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#001a1d] border-t border-white/10 px-6 py-3 flex items-center justify-between z-50">

         
          <div className="max-w-[60%]">
            <p className="font-semibold text-sm truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-white/40">
              Now Playing
            </p>
          </div>

          
          <button
            onClick={() => {
              if (!audioRef.current) return;

              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
              }

              setIsPlaying(!isPlaying);
            }}
            className="bg-[#e1ff51] text-black px-4 py-1 rounded-lg font-medium"
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>

          <audio ref={audioRef} />
        </div>
      )}

    </div>
  );
}