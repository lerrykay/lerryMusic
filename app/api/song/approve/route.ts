import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { id, status } = await req.json();

  await Song.findByIdAndUpdate(id, { status });

  return NextResponse.json({ success: true });
}