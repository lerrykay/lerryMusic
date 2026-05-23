import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";
import cloudinary from "@/app/lib/cloudinary";

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

   
    
    if (!audioFile.type.startsWith("audio/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only audio files are allowed",
        },
        { status: 400 }
      );
    }

  
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    const audioUpload: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "lerrymusic/audio",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(audioBuffer);
    });

    const audioPath = audioUpload.secure_url;

   
    let coverPath = "";

    if (coverFile) {
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());

      const coverUpload: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "lerrymusic/covers",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(coverBuffer);
      });

      coverPath = coverUpload.secure_url;
    }

    
    const song = await Song.create({
      title,
      audioUrl: audioPath,
      coverImage: coverPath,
      userId: user.id,
      status: "pending",
      likes: [],
      comments: [],
    });

    return NextResponse.json({
      success: true,
      message: "Song uploaded successfully and pending approval",
      song,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}