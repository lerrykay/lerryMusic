"use client";

import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

type LoginResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    firstName: string;
    email: string;
    role: "user" | "admin";
    profileImage?: string;
  };
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#00272c] px-4 overflow-hidden">

      
      <div className="absolute w-125 h-125 bg-[#e1ff51] opacity-10 blur-[150px] rounded-full -top-40 -left-40" />
      <div className="absolute w-100 h-100 bg-[#00d4ff] opacity-10 blur-[150px] rounded-full bottom-0 right-0" />

      
      <div className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">

      
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome Back 🎧
        </h1>

        <p className="text-center text-white/50 text-sm mt-2">
          Login to continue your music journey
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Too short").required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);

            try {
              const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const data: LoginResponse = await res.json();

              if (data.success && data.user) {
                resetForm();

                if (data.user.role === "admin") {
                  router.push("/admin");
                } else {
                  router.push("/dashboard");
                }
              }

            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">

              
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

              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e1ff51] text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}