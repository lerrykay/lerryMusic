"use client";

import { useEffect, useState } from "react";

export default function AdminSupport() {
  const [supports, setSupports] = useState<any[]>([]);
  const [replyMap, setReplyMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchSupports();
  }, []);

  const fetchSupports = async () => {
    const res = await fetch("/api/admin/support", {
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setSupports(data.supports);
    }
  };

  const sendReply = async (id: string) => {
    const reply = replyMap[id];
    if (!reply) return;

    await fetch(`/api/admin/support/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reply }),
    });

    fetchSupports(); 
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold text-[#e1ff51] mb-6">
        Support Messages
      </h1>

      <div className="space-y-4">
        {supports.map((s) => (
          <div key={s._id} className="p-4 bg-white/5 rounded-xl">

            <p className="text-sm text-white/60">
              {s.userId?.firstName} ({s.userId?.email})
            </p>

            <p className="mt-2">{s.message}</p>

            {s.reply && (
              <p className="mt-2 text-green-400">
                Reply: {s.reply}
              </p>
            )}

            
            <input
              placeholder="Reply..."
              className="w-full mt-3 p-2 bg-white/10 rounded"
              onChange={(e) =>
                setReplyMap({
                  ...replyMap,
                  [s._id]: e.target.value,
                })
              }
            />

            <button
              onClick={() => sendReply(s._id)}
              className="mt-2 px-3 py-1 bg-[#e1ff51] text-black rounded"
            >
              Send Reply
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}