import { dbConnect } from "@/app/lib/dbConnect";
import { sendSongApprovedEmail } from "@/app/lib/sendEmail";
import Song from "@/app/models/song";
import User from "@/app/models/user";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await dbConnect();

    const { id, status } = await req.json();

    const song = await Song.findById(id);

    if (!song) {
      return NextResponse.json({
        success: false,
        message: "Song not found",
      });
    }

    
    song.status = status;
    await song.save();

    const user = await User.findById(song.userId);

    if (status === "approved" && user) {
      await sendSongApprovedEmail(
        user.email,
        user.firstName,
        song.title
      );
    }

    return NextResponse.json({
      success: true,
      message: "Song updated",
    });

  } catch (error) {
    console.log("APPROVE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}