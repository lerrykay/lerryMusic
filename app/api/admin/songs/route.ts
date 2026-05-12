
import { verifyAdmin } from "@/app/lib/adminAuth";
import { dbConnect } from "@/app/lib/dbConnect";
import { verifyToken } from "@/app/lib/jwt";
import Song from "@/app/models/song";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try{
    await verifyAdmin(req);


  await dbConnect();

  // ✅ FIX: await cookies() if your TS complains
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await verifyToken(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const songs = await Song.find().populate("userId");

  return NextResponse.json({ songs });
}
catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 403 }
    );
  }
}