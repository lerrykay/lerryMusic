"use client";

import { useAudio } from "@/context/AudioPlayerContext";

export default function Player() {
  const { currentSong } = useAudio();

  if (!currentSong) return null;

  return (
    <div className="h-20 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center px-6">

      <div>
        <p className="font-semibold">{currentSong.title}</p>
        <p className="text-xs text-white/50">Now Playing</p>
      </div>

      <audio
        src={currentSong.audioUrl}
        autoPlay
        controls
        className="ml-auto w-1/2"
      />

    </div>
  );
}