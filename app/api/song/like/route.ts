import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";
import Song from "@/app/models/song";

export async function POST(req: Request) {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await verifyToken(token);
  const { songId } = await req.json();

  const song = await Song.findById(songId);

  if (!song) {
    return NextResponse.json({ message: "Song not found" });
  }

  const hasLiked = song.likes.includes(user!.id);

  if (hasLiked) {
    song.likes = song.likes.filter(
      (id: any) => id.toString() !== user!.id
    );
  } else {
    song.likes.push(user!.id);
  }

  await song.save();

  return NextResponse.json({
    success: true,
    liked: !hasLiked,
    likes: song.likes.length,
  });
}