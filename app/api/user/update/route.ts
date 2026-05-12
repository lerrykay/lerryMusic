import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";

export async function PUT(req: Request) {
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

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      user.id, 
      {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        profileImage: body.profileImage,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}