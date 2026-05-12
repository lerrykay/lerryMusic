"use client";

import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext<any>(null);

export function AudioProvider({ children }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = (song: any) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioUrl);

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
      };

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
      };
    } else {
      audioRef.current.src = song.audioUrl;
    }

    audioRef.current.play();
    setIsPlaying(true);
    setCurrentSong(song);
  };

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

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        currentTime,
        duration,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);