"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

import { FaUsers, FaMusic, FaEnvelope, FaCheck, FaTimes } from "react-icons/fa";
import Layout from "@/app/components/DashboardLayout";

export default function AdminDashboard() {
  const { user } = useUser();
  const router = useRouter();

  const [stats, setStats] = useState({ users: 0, songs: 0 });
  const [pendingSongs, setPendingSongs] = useState<any[]>([]);
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    console.log("CURRENT USER:", user);
  }, [user]);

 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsRes, pendingRes, allRes, msgRes] = await Promise.all([
        fetch("/api/admin/stats", { credentials: "include" }),
        fetch("/api/song/pending", { credentials: "include" }),
        fetch("/api/song/all", { credentials: "include" }),
        fetch("/api/support/all", { credentials: "include" }),
      ]);

      const statsData = await statsRes.json().catch(() => ({}));
      const pendingData = await pendingRes.json().catch(() => ({ songs: [] }));
      const allData = await allRes.json().catch(() => ({ songs: [] }));
      const msgData = await msgRes.json().catch(() => ({ messages: [] }));

      setStats(statsData || { users: 0, songs: 0 });
      setPendingSongs(pendingData.songs || []);
      setAllSongs(allData.songs || []);
      setMessages(msgData.messages || []);

    } catch (err) {
      console.log("ADMIN FETCH ERROR:", err);
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  
  const approveSong = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/song-status", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ songId: id, status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchData();
    } catch (err) {
      console.log("APPROVE ERROR:", err);
    }
  };

  if (!user) return null;

  return (
    <Layout user={user}>
      <div className="p-6 space-y-8 text-white relative z-10">

        
        <div>
          <h1 className="text-2xl font-bold text-[#e1ff51]">
            Admin Dashboard
          </h1>
          <p className="text-white/50 text-sm">
            Manage users, songs, and platform activity
          </p>
        </div>

        
        {error && (
          <div className="p-4 bg-red-500/20 text-red-300 rounded-xl">
            {error}
          </div>
        )}

        
        {loading ? (
  <div className="space-y-6 animate-pulse">

    {/* stats */}
    <div className="grid md:grid-cols-3 gap-4">
      <div className="h-24 bg-white/10 rounded-xl" />
      <div className="h-24 bg-white/10 rounded-xl" />
      <div className="h-24 bg-white/10 rounded-xl" />
    </div>

    {/* list */}
    <div className="h-40 bg-white/10 rounded-xl" />
    <div className="h-40 bg-white/10 rounded-xl" />

  </div>
) : (
          <>
            
            <div className="grid md:grid-cols-3 gap-4">

            
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <FaUsers className="text-[#e1ff51] text-xl" />
                <p className="text-2xl font-bold mt-2">{stats.users}</p>
                <p className="text-white/50 text-sm">Total Users</p>
              </div>

            
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <FaMusic className="text-[#e1ff51] text-xl" />
                <p className="text-2xl font-bold mt-2">{stats.songs}</p>
                <p className="text-white/50 text-sm">Total Songs</p>
              </div>

              
              <div
                onClick={() => router.push("/admin/support")}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition"
              >
                <FaEnvelope className="text-[#e1ff51] text-xl" />
                <p className="text-2xl font-bold mt-2">{messages.length}</p>
                <p className="text-white/50 text-sm">Messages</p>
              </div>

            </div>

          
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-[#e1ff51] mb-4">
                Pending Songs
              </h2>

              {pendingSongs.length === 0 ? (
                <div className="text-white/40 text-sm">
                  No pending songs yet. Uploads will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingSongs.map((song) => (
                    <div
                      key={song._id}
                      className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold">{song.title}</p>
                        <p className="text-xs text-white/40">
                          by {song.userId?.firstName || "User"}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => approveSong(song._id, "approved")}
                          className="text-green-400 hover:scale-110 transition"
                        >
                          <FaCheck />
                        </button>

                        <button
                          onClick={() => approveSong(song._id, "rejected")}
                          className="text-red-400 hover:scale-110 transition"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-[#e1ff51] mb-4">
                All Songs
              </h2>

              {allSongs.length === 0 ? (
                <div className="text-white/40 text-sm">
                  No songs available yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {allSongs.slice(0, 5).map((song) => (
                    <div key={song._id} className="p-3 bg-white/5 rounded-xl">
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-xs text-white/40">
                        ❤️ {song.likes?.length || 0} likes
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-[#e1ff51] mb-2">
                Community
              </h2>
              <p className="text-white/50 text-sm">
                Admin insights, reports, and activity overview coming soon...
              </p>

            
              <button
                onClick={() => router.push("/admin/support")}
                className="mt-4 px-4 py-2 bg-[#e1ff51] text-black rounded"
              >
                Open Support Inbox
              </button>
            </div>
          </>
        )}

      </div>
    </Layout>
  );
}