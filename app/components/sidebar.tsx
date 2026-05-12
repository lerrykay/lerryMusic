"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();

  const nav = [
    { name: "Explore", path: "/explore" },
    { name: "Upload", path: "/upload" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <div className="w-64 bg-black/30 backdrop-blur-xl p-6 border-r border-white/10">

  
      <h1 className="text-2xl font-bold text-[#e1ff51] mb-10">
        lerryMusic
      </h1>

    
      <div className="space-y-4">
        {nav.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition
              ${
                path === item.path
                  ? "bg-[#e1ff51] text-black"
                  : "hover:bg-white/10"
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>

    </div>
  );
}