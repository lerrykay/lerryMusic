"use client";

import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { signupUser } from "@/app/actions/userActions";
import { handleImageUpload } from "@/app/lib/upload";

const genres = [
  "Afrobeats",
  "Hip Hop",
  "R&B",
  "Pop",
  "EDM",
  "Amapiano",
  "Gospel",
  "Jazz",
  "Reggae",
];

export default function SignupForm() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await handleImageUpload(file);
      setImage(url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

        {/* TITLE */}
        <h1 className="text-center text-2xl font-bold text-white mb-6">
          Create Account 🎵
        </h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            dob: "",
            artist: "",
            genre: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6).required("Required"),
            dob: Yup.string().required("Required"),
            artist: Yup.string().required("Required"),
            genre: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);

            try {
              await signupUser({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dob,
                favoriteArtist: values.artist,
                favoriteGenre: values.genre,
                profileImage: image || "",
              });

              resetForm();
              setImage(null);
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">

              
              <div className="flex flex-col items-center mb-2">

                <div className="w-24 h-24 rounded-full border border-[#e1ff51]/40 bg-white/5 overflow-hidden flex items-center justify-center shadow-md">
                  {image ? (
                    <img src={image} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white/40 text-xs">
                      Upload Photo
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="mt-3 text-xs text-white/70"
                />
              </div>

            
              <div className="grid grid-cols-2 gap-3">

                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
                />

              </div>

              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
              />

              <input
                name="dob"
                type="date"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
              />

              <input
                name="artist"
                placeholder="Favorite Artist"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#e1ff51] transition"
              />

              
              <select
                name="genre"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg outline-none focus:border-[#e1ff51] transition"
              >
                <option value="">Select Favorite Genre</option>
                {genres.map((g) => (
                  <option key={g} value={g} className="bg-[#00272c]">
                    {g}
                  </option>
                ))}
              </select>

            
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e1ff51] text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}