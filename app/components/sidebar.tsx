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
    <div className="hidden md:flex flex-col w-64 h-screen bg-black/30 backdrop-blur-xl p-6 border-r border-white/10 fixed md:static z-40">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-[#e1ff51] mb-10">
        lerryMusic
      </h1>

      {/* NAV */}
      <div className="space-y-4 flex-1">
        {nav.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base
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