import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import { NextResponse } from "next/server";


export async function GET() {
  await dbConnect();

  const songs = await Song.find({ status: "approved" }).populate("userId", "firstName lastName profileImage")
  .populate("comments.userId", "firstName profileImage")
  
  .sort({ createdAt: -1 });

  return NextResponse.json({ songs });
}