"use server";

import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import { verifyToken } from "@/app/lib/jwt";
import User from "@/app/models/user";
import { cookies } from "next/headers";


export async function GET() {
  try {
    await dbConnect();

    
    const cookieStore = await cookies();
    const token = 
    cookieStore.get("token")?.value;

    
    if (!token) {
      return NextResponse.json({ user: null });
    }

    
    const payload = await verifyToken(token);

    if (!payload || typeof payload !== "object" || !("id" in payload)) {
      return NextResponse.json({ user: null });
    }

    
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return NextResponse.json({ user: null });
    }

    
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        favoriteArtist: user.favoriteArtist,
        favoriteGenre: user.favoriteGenre,
        dateOfBirth: user.dateOfBirth,
      },
    });

  } catch (error) {
    return NextResponse.json({ user: null });
  }
}