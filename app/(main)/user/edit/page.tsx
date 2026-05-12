"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BackButton from "@/app/components/BackButton";

export default function EditProfile() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    fetch("/api/user/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          bio: data.user.bio || "",
          profileImage: data.user.profileImage || "",
        });
      });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/user/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    setForm(prev => ({
      ...prev,
      profileImage: data.user.profileImage,
    }));
  };

  const handleSave = async () => {
    await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    await refreshUser();
    router.push("/user/me");
  };

  return (
    <div className="min-h-screen bg-[#00272c] text-white px-4 sm:px-6 py-8 flex justify-center">

      
      <div className="w-full max-w-2xl">

        
        <div className="mb-5">
          <BackButton />
        </div>

        
        <div className="mb-8 text-center sm:text-left">

          <h1 className="text-2xl sm:text-3xl font-bold text-[#e1ff51]">
            Edit Profile
          </h1>

          <p className="text-white/40 text-sm mt-2">
            Customize your identity on Music by Lerry
          </p>

        </div>

        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">

          
          <div className="flex flex-col items-center">

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#e1ff51]/10 border border-white/10 flex items-center justify-center shadow-lg">

              {form.profileImage ? (
                <img
                  src={form.profileImage}
                  className="w-full h-full object-cover"
                />
             ) : (
                <span className="text-2xl font-bold text-[#e1ff51]">
                  {form.firstName?.charAt(0)}
                </span>
              )}
            </div>

            <label className="mt-4 text-sm text-[#e1ff51] cursor-pointer hover:underline">
              Change Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#e1ff51] transition"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#e1ff51] transition"
            />

          </div>

          
          <div>

            <label className="text-xs uppercase tracking-wider text-[#e1ff51]">
              Bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell people about yourself..."
              className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#e1ff51] transition min-h-30"
            />

          </div>

          
          <button
            onClick={handleSave}
            className="w-full bg-[#e1ff51] text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}