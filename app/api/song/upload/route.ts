import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";
import fs from "fs";


export async function POST(req: Request) {
  try {
    await dbConnect();


    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }


    const formData = await req.formData();

    const title = formData.get("title") as string;

    const audioFile = formData.get("file") as File;
    const coverFile = formData.get("cover") as File | null;

    if (!title || !audioFile) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // 🎧 AUDIO SAVE
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const audioName = `${Date.now()}-${audioFile.name}`;
    const audioPath = `/uploads/audio/${audioName}`;

    fs.mkdirSync("./public/uploads/audio", { recursive: true });
    fs.writeFileSync(`./public${audioPath}`, audioBuffer);


    let coverPath = "";

    if (coverFile) {
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      const coverName = `${Date.now()}-${coverFile.name}`;
      coverPath = `/uploads/covers/${coverName}`;

      fs.mkdirSync("./public/uploads/covers", { recursive: true });
      fs.writeFileSync(`./public${coverPath}`, coverBuffer);
    }

    
    const song = await Song.create({
      title,
      audioUrl: audioPath,
      coverImage: coverPath || "", // 🔥 NEW FIELD
      userId: user.id,
      status: "pending",
      likes: [],
      comments: [],
    });

    return NextResponse.json({
      success: true,
      song,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}