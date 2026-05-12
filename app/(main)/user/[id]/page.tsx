"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SongCard from "@/app/components/SongCard";
import BackButton from "@/app/components/BackButton";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();

      setUser(data.user);
      setSongs(data.songs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#00272c] text-white px-6 md:px-12 py-10 animate-pulse">

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mb-12">

          <div className="w-24 h-24 rounded-2xl bg-white/10" />

          <div className="space-y-3 w-full max-w-md">
            <div className="h-6 w-40 bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-32 bg-white/10 rounded" />
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 bg-white/10 rounded-2xl" />
          <div className="h-40 bg-white/10 rounded-2xl" />
          <div className="h-40 bg-white/10 rounded-2xl" />
        </div>

      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#00272c] text-white flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00272c] text-white relative pb-32 overflow-hidden">

      
      <div className="absolute w-112.5 h-112.5 bg-[#e1ff51] opacity-10 blur-[150px] rounded-full -top-40 -left-40 pointer-events-none" />

      <div className="relative z-10 px-5 md:px-12 pt-8">

        
        <div className="mb-6">
          <BackButton />
        </div>

        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl">

          <div className="flex flex-col md:flex-row gap-8 md:items-center">

          
            <div className="relative flex justify-center md:justify-start">

              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-[#e1ff51]/10 border border-white/10 flex items-center justify-center">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                ) : (
                  <span className="text-3xl font-bold text-[#e1ff51]">
                    {user.firstName?.charAt(0)}
                  </span>
                )}

              </div>

              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-semibold bg-green-500 text-black rounded-full border border-[#00272c]">
                ACTIVE
              </div>

            </div>

            
            <div className="flex-1 text-center md:text-left">

              <div className="flex justify-center md:justify-start gap-3 mb-2">

                <span className={`px-3 py-1 text-xs rounded-full border ${
                  user.role === "admin"
                    ? "bg-red-500/10 text-red-300 border-red-500/20"
                    : "bg-[#e1ff51]/10 text-[#e1ff51] border-[#e1ff51]/20"
                }`}>
                  {user.role === "admin" ? "ADMIN" : "USER"}
                </span>

              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>

              <p className="text-white/40 text-sm mt-1">
                @{user.firstName?.toLowerCase()}
              </p>

              <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-2xl">

                <p className="text-xs uppercase tracking-[2px] text-[#e1ff51] mb-2">
                  Bio
                </p>

                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {user.bio || "This user hasn’t added a bio yet."}
                </p>

              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">

                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[#e1ff51] font-bold">
                    {songs.length}
                  </p>
                  <p className="text-xs text-white/40">Songs</p>
                </div>

                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[#e1ff51] font-bold">
                    {songs.reduce((a, s) => a + (s.likes?.length || 0), 0)}
                  </p>
                  <p className="text-xs text-white/40">Likes</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      
        <div className="mt-10">

          <h2 className="text-xl font-bold text-[#e1ff51] mb-5">
            Uploaded Songs
          </h2>

          {songs.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50">
              No songs uploaded yet
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {songs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}