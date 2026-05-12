"use client";

import MusicPlayer from "../components/MusicPlayer";
import Player from "../components/player";
import Sidebar from "../components/sidebar";


export default function MainLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-[#00272c] text-white overflow-hidden">

    
      <Sidebar/>

      
      <div className="flex-1 flex flex-col">

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        
        <Player />

      </div>
<MusicPlayer/>
    </div>
  );
}