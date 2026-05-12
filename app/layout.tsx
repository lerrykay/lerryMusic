import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalPlayer from "./components/GlobalPlayer";
import { AudioProvider } from "@/context/AudioPlayerContext";
import { AuthProvider } from "@/context/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music by Lerry",
  description: "Stream, Upload and Connect through music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      
      <body className="min-h-full flex flex-col">
        <AudioProvider>
          <AuthProvider>
    
          {children}
          
          </AuthProvider>
          <GlobalPlayer/>
        </AudioProvider>
        </body>
    </html>
  );
}
