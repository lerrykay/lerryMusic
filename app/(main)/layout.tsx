"use client";

import MusicPlayer from "../components/MusicPlayer";
import Player from "../components/player";
import Sidebar from "../components/sidebar";

export default function MainLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-[#00272c] text-white">

      {/* SIDEBAR (still visible logic controlled inside sidebar itself) */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-4">
          {children}
        </div>

        {/* PLAYER AREA */}
        <div className="border-t border-white/10">
          <Player />
        </div>

        <div className="border-t border-white/10">
          <MusicPlayer />
        </div>

      </div>

    </div>
  );
}