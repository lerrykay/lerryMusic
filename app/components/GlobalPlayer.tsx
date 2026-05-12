"use client";

import { useAudio } from "@/context/AudioPlayerContext";
import { useEffect, useRef, useState } from "react";

export default function GlobalPlayer() {
  const { currentSong } = useAudio();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;

    setProgress((current / duration) * 100);
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#001f23] border-t border-white/10 px-4 py-3 flex items-center justify-between z-50">

      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#e1ff51]/30 rounded-lg" />

        <div>
          <p className="text-sm font-semibold">{currentSong.title}</p>
          <p className="text-xs text-white/50">Now Playing</p>
        </div>
      </div>

      
      <div className="flex flex-col items-center w-1/2">

        <button
          onClick={togglePlay}
          className="bg-[#e1ff51] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold"
        >
          {isPlaying ? "❚❚" : "▶️"}
        </button>

        
        <div className="w-full h-1 bg-white/20 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e1ff51]"
            style={{ width: `${progress}% `}}
          />
        </div>
      </div>

      
      <div className="w-12" />

      
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}