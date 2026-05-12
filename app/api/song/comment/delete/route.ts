
import { dbConnect } from "@/app/lib/dbConnect";
import { getUserFromRequest } from "@/app/lib/getUserFromRequest";
import Song from "@/app/models/song";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await dbConnect();

  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { songId, commentId } = await req.json();

  const song = await Song.findById(songId);

  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  
  const comment = song.comments.id(commentId);

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  if (
    comment.userId.toString() !== user.id &&
    user.role !== "admin"
  ) {
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }

  comment.deleteOne();
  await song.save();

  return NextResponse.json({ success: true });
}