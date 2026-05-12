"use client";

import { FaHeart, FaComment } from "react-icons/fa";
import { useAudio } from "@/context/AudioPlayerContext";
import Link from "next/link";

type Props = {
  song: any;
  onLike?: (id: string) => void;
  onComment?: (id: string, text: string) => void;
  commentText?: string;
  setCommentText?: (val: string) => void;
};

export default function SongCard({
  song,
  onLike,
  onComment,
  commentText,
  setCommentText,
}: Props) {
  const { playSong } = useAudio();

  const getUserName = (user: any) =>
    typeof user === "object" && user !== null ? user.firstName : "User";

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group shadow-lg hover:shadow-2xl">

  
      <div className="absolute inset-0">
        <img
          src={song.coverImage || "/default-cover.jpg"}
          className="w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20">

        <button
          onClick={() =>
            playSong({
              _id: song._id,
              title: song.title,
              audioUrl: song.audioUrl,
            })
          }
          className="w-16 h-16 bg-[#e1ff51] text-black rounded-full flex items-center justify-center text-xl font-bold hover:scale-110 active:scale-95 transition"
        >
          ▶️
        </button>

      </div>

      
      <div className="relative z-20 h-full flex flex-col justify-between p-4">

        
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-full bg-[#e1ff51]/30 flex items-center justify-center text-black font-bold text-sm">
            {getUserName(song.userId)?.charAt(0) || "U"}
          </div>

          <Link href={`/user/${typeof song.userId === "object" ? song.userId._id : song.userId}`}>
            <p className="text-sm text-white/60 hover:text-[#e1ff51] cursor-pointer">
              {getUserName(song.userId)}
            </p>
          </Link>

        </div>

        
        <p className="text-white font-semibold truncate">
          {song.title}
        </p>


        <div className="flex items-center justify-between text-white/70 text-sm">

          <button
            onClick={() => onLike?.(song._id)}
            className="flex items-center gap-2 hover:text-[#e1ff51]"
          >
            <FaHeart />
            <span>{song.likes?.length || 0}</span>
          </button>

          <div className="flex items-center gap-2">
            <FaComment />
            <span>{song.comments?.length || 0}</span>
          </div>

        </div>

        {/* COMMENT INPUT (ONLY IF HANDLERS EXIST) */}
        {onComment && setCommentText && (
          <div className="flex gap-2">

            <input
              value={commentText || ""}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comment..."
              className="flex-1 p-1 text-xs rounded bg-white/5 text-white outline-none"
            />

            <button
              onClick={() => onComment(song._id, commentText || "")}
              className="px-2 py-1 text-xs bg-[#e1ff51] text-black rounded"
            >
              Send
            </button>

          </div>
        )}

      </div>
    </div>
  );
}