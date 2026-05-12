import { NextResponse } from "next/server";

import { jwtVerify } from "jose";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie");

    const token = cookie
      ?.split("token=")[1]
      ?.split(";")[0];

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload }: any = await jwtVerify(token, secret);

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      payload.id,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
      },
      { new: true }
    );

    return NextResponse.json({ user: updatedUser });

  } catch (err) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}