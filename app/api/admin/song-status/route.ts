import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";
import Song from "@/app/models/song";
import { verifyAdmin } from "@/app/lib/adminAuth";

export async function POST(req: Request) {
  try{
    await verifyAdmin(req);
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await verifyToken(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { songId, status } = await req.json();

  if (!songId || !status) {
    return NextResponse.json({ message: "Missing data" });
  }

  await Song.findByIdAndUpdate(songId, { status });

  return NextResponse.json({
    success: true,
    message: `Song ${status}`,
  });
}
catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 403 }
    );
  }
}