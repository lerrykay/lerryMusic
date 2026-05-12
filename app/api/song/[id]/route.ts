import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // ✅ await params
    const { id } = await params;

    const song = await Song.findById(id);

    if (!song) {
      return NextResponse.json(
        { message: "Song not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ song });

  } catch (error) {
    console.log("SONG FETCH ERROR:", error);

    return NextResponse.json(
      { message: "Error fetching song" },
      { status: 500 }
    );
  }
}