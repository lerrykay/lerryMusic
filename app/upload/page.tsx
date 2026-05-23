"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });


  const isAudioFile = (f: File | null) => {
    return f && f.type && f.type.startsWith("audio/");
  };

  const uploadSong = async () => {
    if (!title || !file) {
      setStatus({
        type: "error",
        message: "Please fill all required fields",
      });
      return;
    }


    if (!isAudioFile(file)) {
      setStatus({
        type: "error",
        message: "Only audio files are allowed",
      });
      setFile(null);
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      const res = await fetch("/api/song/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          message:
            "Song uploaded successfully and is pending admin approval",
        });

        setTimeout(() => {
          router.push("/explore");
        }, 1500);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Upload failed",
        });
      }
    } catch (error) {
      console.log("UPLOAD ERROR:", error);

      setStatus({
        type: "error",
        message: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00272c] text-white relative overflow-hidden px-4 py-8 sm:px-6">

      <div className="absolute w-100 h-100 bg-[#e1ff51] opacity-10 blur-[140px] rounded-full -top-32 -left-32 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        <div className="mb-5">
          <BackButton />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-4xl backdrop-blur-xl shadow-2xl overflow-hidden">

          <div className="p-6 sm:p-8 border-b border-white/10">

            <div className="text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#e1ff51]/10 border border-[#e1ff51]/20 flex items-center justify-center text-3xl mb-4">
                🎵
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#e1ff51] tracking-tight">
                Upload Song
              </h1>

              <p className="text-white/50 mt-3 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Share your sound with the world and connect through music
              </p>

            </div>

          </div>

          <div className="p-5 sm:p-8">

            {status.type && (
              <div
                className={`mb-6 p-4 rounded-2xl border text-sm ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-300 border-green-500/20"
                    : "bg-red-500/10 text-red-300 border-red-500/20"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* TITLE */}
            <div className="mb-6">

              <label className="block text-sm font-medium mb-3 text-white/70">
                Song Title
              </label>

              <input
                type="text"
                placeholder="Enter song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[#e1ff51] focus:bg-white/[0.07] transition text-white placeholder:text-white/30"
              />

            </div>

            
            <div className="mb-6">

              <label className="block text-sm font-medium mb-3 text-white/70">
                Audio File
              </label>

              <label className="block cursor-pointer group">

                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0] || null;

                    
                    if (selected && !selected.type.startsWith("audio/")) {
                      setStatus({
                        type: "error",
                        message: "Only audio files are allowed",
                      });
                      setFile(null);
                      return;
                    }

                    setFile(selected);
                  }}
                />

                <div className="p-5 sm:p-6 border border-dashed border-white/20 rounded-3xl bg-white/3 hover:bg-white/6 hover:border-[#e1ff51]/30 transition-all duration-300">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex-1 min-w-0">

                      <p className="text-lg font-semibold">
                        Upload Audio
                      </p>

                      <p className="text-sm text-white/40 mt-1">
                        MP3, WAV and other audio formats
                      </p>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#e1ff51]/10 border border-[#e1ff51]/20 flex items-center justify-center text-2xl shrink-0">
                      🎶
                    </div>

                  </div>

                  {file && (
                    <div className="mt-5 p-4 rounded-2xl bg-[#e1ff51]/10 border border-[#e1ff51]/20">

                      <p className="text-xs text-white/50 mb-1">
                        Selected File
                      </p>

                      <p className="text-sm text-[#e1ff51] truncate font-medium">
                        {file.name}
                      </p>

                    </div>
                  )}

                </div>

              </label>

            </div>

            
            <div className="mb-8">

              <label className="block text-sm font-medium mb-3 text-white/70">
                Cover Image
              </label>

              <label className="block cursor-pointer group">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0] || null;

                    // optional safety
                    if (selected && !selected.type.startsWith("image/")) {
                      setStatus({
                        type: "error",
                        message: "Only image files allowed for cover",
                      });
                      setCoverFile(null);
                      return;
                    }

                    setCoverFile(selected);
                  }}
                />

                <div className="p-5 sm:p-6 border border-dashed border-white/20 rounded-3xl bg-white/3">

                  <p className="text-sm text-white/40">
                    Upload Cover Image (optional)
                  </p>

                  {coverFile && (
                    <p className="text-[#e1ff51] text-sm mt-2">
                      {coverFile.name}
                    </p>
                  )}

                </div>

              </label>

            </div>

            <button
              onClick={uploadSong}
              disabled={loading}
              className="w-full bg-[#e1ff51] text-black py-4 rounded-2xl font-bold"
            >
              {loading ? "Uploading..." : "Upload Song"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}