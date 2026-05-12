import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import { verifyAdmin } from "@/app/lib/adminAuth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    
    await verifyAdmin(req);

    const { id } = await params;

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id, 
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
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}