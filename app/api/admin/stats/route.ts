import { verifyAdmin } from "@/app/lib/adminAuth";
import { dbConnect } from "@/app/lib/dbConnect";
import Song from "@/app/models/song";
import User from "@/app/models/user";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

  try{
    await verifyAdmin(req)
  await dbConnect();

  const users = await User.countDocuments();
  const songs = await Song.countDocuments();

  return NextResponse.json({ users, songs });
  }
  catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 403 }
    );
  }
}