"use client";

import { useState } from "react";

export default function SupportPage() {
  const [message, setMessage] = useState("");

  const sendSupport = async () => {
    await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message }),
    });

    setMessage("");
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen p-6 text-white">

      <h1 className="text-2xl font-bold text-[#e1ff51] mb-4">
        Support / Help
      </h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your issue or feedback..."
        className="w-full p-3 bg-white/5 rounded outline-none min-h-30"
      />

      <button
        onClick={sendSupport}
        className="mt-4 px-4 py-2 bg-[#e1ff51] text-black rounded"
      >
        Send
      </button>

    </div>
  );
}