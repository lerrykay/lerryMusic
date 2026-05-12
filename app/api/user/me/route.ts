import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function GET() {
  try {
    await dbConnect();

    // GET TOKEN FROM COOKIES
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token" },
        { status: 401 }
      );
    }

    // VERIFY JWT
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload }: any = await jwtVerify(
      token,
      secret
    );

    // FIND USER
    const user = await User.findById(payload.id)
      .select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("USER ME ERROR:", error);

    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}