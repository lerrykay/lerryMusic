"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAudio } from "@/context/AudioPlayerContext";
import { FaHeart, FaComment } from "react-icons/fa";

export default function SongPage() {
  const { id } = useParams();
  const { playSong, currentSong } = useAudio();

  const [song, setSong] = useState<any>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch(`/api/song/${id}`)
      .then(res => res.json())
      .then(data => setSong(data.song));
  }, [id]);

  if (!song)
    return <p className="text-white p-6">Loading...</p>;

  
  const sendComment = async () => {
    if (!commentText) return;

    await fetch("/api/song/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        songId: song._id,
        text: commentText,
      }),
    });

    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-[#00272c] text-white p-6 relative">

      
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#e1ff51] opacity-10 blur-[140px] rounded-full"></div>

      
      <div className="relative z-10">

        <h1 className="text-4xl font-bold text-[#e1ff51]">
          {song.title}
        </h1>

        <p className="text-white/60 mt-1">
          by {song.userId?.firstName || "User"}
        </p>

        
        <button
          onClick={() =>
            playSong({
              _id: song._id,
              title: song.title,
              audioUrl: song.audioUrl,
            })
          }
          className="mt-5 px-6 py-3 bg-[#e1ff51] text-black rounded-full font-semibold hover:scale-105 transition"
        >
          {currentSong?._id === song._id
            ? "Playing..."
            : "Play ▶️"}
        </button>

      </div>

      
      <div className="mt-8 relative z-10">
        <audio
          controls
          src={song.audioUrl}
          className="w-full rounded-lg"
        />
      </div>

      
      <div className="flex items-center gap-6 mt-6 text-white/70 relative z-10">

        <div className="flex items-center gap-2">
          <FaHeart className="text-[#e1ff51]" />
          <span>{song.likes?.length || 0}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaComment />
          <span>{song.comments?.length || 0}</span>
        </div>

      </div>

      
      <div className="mt-10 relative z-10">

        <h2 className="text-lg font-bold text-[#e1ff51] mb-4">
          Comments
        </h2>

        
        <div className="flex gap-2 mb-6">

          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-3 rounded-lg bg-white/5 text-white outline-none"
          />

          <button
            onClick={sendComment}
            className="px-4 py-3 bg-[#e1ff51] text-black rounded-lg hover:scale-105 transition"
          >
            Send
          </button>

        </div>

        
        <div className="space-y-3">

          {song.comments?.map((c: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 p-3 rounded-lg"
            >
              <p className="text-sm text-[#e1ff51]">
                {c.userId?.firstName || "User"}
              </p>
              <p className="text-white/70 text-sm">
                {c.text}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}