import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Song from "@/app/models/song";
import { dbConnect } from "@/app/lib/dbConnect";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  
  const { id } = await params;

  const user = await User.findById(id).select("-password");

  const songs = await Song.find({ userId: id }).sort({
    createdAt: -1,
  });

  return NextResponse.json({
    user,
    songs,
  });
}