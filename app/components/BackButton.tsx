"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-sm font-bold text-[#e1ff51] hover:underline transition"
    >
      ← Back
    </button>
  );
}