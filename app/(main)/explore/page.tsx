"use client";

import SongFeed from "@/app/components/SongFeed";
import BackButton from "@/app/components/BackButton";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#00272c] text-white px-6 md:px-10 pb-32">

      <div className="pt-6 mb-6">

        
        <BackButton />

        <h1 className="text-3xl md:text-4xl font-bold mt-4">
          Explore Music
        </h1>

        <p className="text-white/50 mt-2">
          Discover new sounds from creators
        </p>

      </div>

      
      <SongFeed />

    </div>
  );
}