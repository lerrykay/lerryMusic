"use client";

import { useAudio } from "@/context/AudioPlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
  } = useAudio();

  if (!currentSong) return null;

  const format = (t: number) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
  <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden">

  
  <div className="absolute inset-0">
    <img
      src={currentSong.coverImage || "/default-cover.jpg"}
      className="w-full h-full object-cover opacity-30 scale-110 blur-xl"
    />
    <div className="absolute inset-0 bg-black/70"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto p-3">

    
    <div className="flex items-center justify-between">

      <div>
        <p className="text-white font-semibold text-sm">
          {currentSong.title}
        </p>
        <p className="text-white/50 text-xs">
          Now Playing
        </p>
      </div>

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[#e1ff51] text-black flex items-center justify-center"
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>

    </div>

    
    <div className="flex items-center gap-2 text-xs text-white/60 mt-2">

      <span>{format(currentTime)}</span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="w-full accent-[#e1ff51]"
      />

      <span>{format(duration)}</span>

    </div>

  </div>

</div>
  );
}