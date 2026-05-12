import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import { NextResponse } from "next/server";


export async function GET() {
  await dbConnect();

  const songs = await Song.find({ status: "pending" }).populate("userId", "firstName lastName profileImage");

  return NextResponse.json({ songs });
}