"use client";

import { useState } from "react";
import LoginForm from "./login/LoginForm";
import SignupForm from "./signup/SignupForm";

export default function AuthSwitcher() {
  const [mode, setMode] = useState<"login" | "signup">("signup");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00272c] px-4 py-10 relative overflow-hidden">

  
      <div className="absolute w-100 h-100 bg-[#e1ff51] opacity-20 blur-[140px] rounded-full top-10 left-10"></div>
      <div className="absolute w-75 h-75 bg-[#e1ff51] opacity-10 blur-[120px] rounded-full bottom-10 right-10"></div>

      
      <div className="w-full max-w-md md:max-w-lg bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl p-5 md:p-8 z-10 transition-all">

        
        <div className="flex flex-col gap-2 mb-6 text-center">

          <h1 className="text-[#e1ff51] text-2xl font-bold">
            lerryMusic
          </h1>

          <p className="text-white/60 text-sm">
            {mode === "login"
              ? "Welcome back to your sound space"
              : "Join and share your sound with the world"}
          </p>

          
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-white/60 hover:text-[#e1ff51] transition"
            >
              {mode === "login"
                ? "No account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>

        
        <div className="transition-all duration-300">
          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>

      </div>
    </div>
  );
}