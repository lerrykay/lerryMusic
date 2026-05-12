import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { dbConnect } from "@/app/lib/dbConnect";
import cloudinary from "@/app/lib/cloudinary";
import User from "@/app/models/user";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file" }, { status: 400 });
    }

  
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profiles" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    const user = await User.findByIdAndUpdate(
      payload.id,
      { profileImage: uploadRes.secure_url },
      { new: true }
    );

    return NextResponse.json({ user });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}