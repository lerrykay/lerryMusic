"use client";

import { useEffect, useState } from "react";
import { SongType } from "@/types/song";
import { useRouter } from "next/navigation";

export default function SongFeed() {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await fetch("/api/song/all");
      const data = await res.json();
      setSongs(data.songs || []);
    } catch (error) {
      console.log(error);
    }
  };

  const likeSong = async (id: string) => {
    try {
      await fetch("/api/song/like", {
        method: "POST",
        body: JSON.stringify({ songId: id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      fetchSongs();
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (id: string, text: string) => {
    if (!text) return;

    try {
      await fetch("/api/song/comment", {
        method: "POST",
        body: JSON.stringify({ songId: id, text }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      setCommentText((prev) => ({ ...prev, [id]: "" }));
      fetchSongs();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (songId: string, commentId: string) => {
    try {
      await fetch("/api/song/comment/delete", {
        method: "POST",
        body: JSON.stringify({ songId, commentId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      fetchSongs();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredSongs = songs.filter((song) => {
    const q = search.toLowerCase();

    const titleMatch = song.title?.toLowerCase().includes(q);

    const userMatch =
      typeof song.userId === "object" &&
      song.userId?.firstName?.toLowerCase().includes(q);

    return titleMatch || userMatch;
  });

  return (
    <div className="px-4 md:px-8 py-6">

  
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search songs or artists..."
          className="w-full md:w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#e1ff51]"
        />
      </div>

      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filteredSongs.map((song) => {
          const user = song.userId;
          const comments = song.comments || [];

          return (
            <div
              key={song._id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
            >

              
              <div className="h-44 w-full bg-black/30">
                {song.coverImage ? (
                  <img
                    src={song.coverImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    No Cover Image
                  </div>
                )}
              </div>

              <div className="p-4">

                <h3 className="font-semibold text-lg">
                  {song.title}
                </h3>

                <button
                  onClick={() => {
                    if (typeof user === "object") {
                      router.push(`/user/${user._id}`);
                    }
                  }}
                  className="text-sm text-white/50 hover:text-[#e1ff51]"
                >
                  by {typeof user === "object" ? user.firstName : "User"}
                </button>

              
                <audio
                  controls
                  src={song.audioUrl}
                  className="w-full mt-3 mb-4"
                />

                
                <button
                  onClick={() => likeSong(song._id)}
                  className="text-pink-400 text-sm mb-3"
                >
                  ❤️ {song.likes?.length || 0}
                </button>

                
                <div className="bg-black/20 border border-white/10 rounded-xl p-3">

                  <p className="text-[#e1ff51] text-xs mb-2 uppercase">
                    Comments
                  </p>

                  <div className="space-y-2 max-h-28 overflow-y-auto mb-3">

                    {comments.length === 0 ? (
                      <p className="text-white/40 text-xs">
                        No comments yet
                      </p>
                    ) : (
                      comments.map((c: any) => (
                        <div
                          key={c._id}
                          className="flex justify-between items-center bg-white/5 p-2 rounded-lg"
                        >
                          <div className="text-sm">
                            <span className="text-[#e1ff51] text-xs font-semibold">
                              {typeof c.userId === "object"
                                ? c.userId?.firstName
                                : "User"}
                            </span>

                            <span className="text-white/80 ml-2">
                              {c.text}
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              deleteComment(song._id, c._id)
                            }
                            className="text-red-400 text-xs hover:text-red-300"
                          >
                            🗑️
                          </button>
                        </div>
                      ))
                    )}

                  </div>

                  
                  <div className="flex items-center w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">

                    <input
                      value={commentText[song._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [song._id]: e.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="flex-1 bg-transparent text-sm text-white px-4 py-2 outline-none placeholder:text-white/30 min-w-0"
                    />

                    <button
                      onClick={() =>
                        sendComment(song._id, commentText[song._id])
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e1ff51] text-black font-bold shrink-0 hover:scale-105 active:scale-95 transition"
                    >
                      ➤
                    </button>

                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}