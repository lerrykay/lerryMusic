"use client";

import { useUser } from "@/app/hooks/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SongType } from "@/types/song";
import Layout from "@/app/components/DashboardLayout";
import Link from "next/link";


import { SongSkeleton } from "@/app/components/skeletons/SongSkeleton";
import { CardSkeleton } from "@/app/components/skeletons/CardSkeleton";
import { UserSkeleton } from "@/app/components/skeletons/UserSkeleton";

export default function UserDashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [songs, setSongs] = useState<SongType[]>([]);
  const [songsLoading, setSongsLoading] = useState(true);

  
  const [currentSong, setCurrentSong] = useState<SongType | null>(null);

  const playSong = (song: SongType) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    setSongsLoading(true);

    fetch("/api/song/all")
      .then((res) => res.json())
      .then((data) => setSongs(data.songs || []))
      .finally(() => setSongsLoading(false));
  }, []);

  
  if (loading || !user) {
    return (
      <Layout user={null}>
        <div className="space-y-6">

          <UserSkeleton />

          <div className="grid md:grid-cols-3 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>

          <div className="space-y-3">
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
          </div>

        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} currentSong={currentSong}>

    
      <div className="grid md:grid-cols-3 gap-4">

        <div
          onClick={() => router.push("/chat")}
          className="p-5 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition"
        >
          <p className="text-lg">💬</p>
          <p className="font-semibold mt-2">Chat Users</p>
          <p className="text-xs text-white/40">Connect with others</p>
        </div>

        <Link href="/upload">
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition">
            <p className="text-lg">🎵</p>
            <p className="font-semibold mt-2">Upload Song</p>
            <p className="text-xs text-white/40">Share your music</p>
          </div>
        </Link>

        <Link href="/support">
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition">
            <p className="text-lg">📩</p>
            <p className="font-semibold mt-2">Support</p>
            <p className="text-xs text-white/40">Contact admin</p>
          </div>
        </Link>

      </div>

     
      <div className="mt-8">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-[#e1ff51]">
            Explore Songs
          </h2>
          <span className="text-xs text-white/40">
            Latest uploads
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">

          {songsLoading ? (
            <>
              <SongSkeleton />
              <SongSkeleton />
              <SongSkeleton />
            </>
          ) : (
            songs.map((song) => (
              <div
                key={song._id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition"
              >
                
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs text-white/40">
                    Tap to play
                  </p>
                </div>

                
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => playSong(song)}
                    className="bg-[#e1ff51] text-black px-3 py-1 rounded-lg text-sm"
                  >
                    ▶️
                  </button>

                  <button className="text-pink-400">
                    ❤️
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

      </div>

  
      <div className="mt-8 grid md:grid-cols-2 gap-4">

        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="font-semibold mb-2">🌍 Community</h3>
          <p className="text-sm text-white/40">
            Discover new artists and trending music
          </p>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="font-semibold mb-2">📊 Growth</h3>
          <p className="text-sm text-white/40">
            Track your uploads and engagement
          </p>
        </div>

      </div>

    </Layout>
  );
}