import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { dbConnect } from "@/app/lib/dbConnect";
import Support from "@/app/models/support";


export async function POST(req: Request) {
  try {
    await dbConnect();

    const cookie = req.headers.get("cookie");
    const token = cookie?.split("token=")[1]?.split(";")[0];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token!, secret);

    const body = await req.json();

    const support = await Support.create({
      userId: payload.id,
      message: body.message,
      type: body.type || "general",
    });

    return NextResponse.json({ support });
  } catch (err) {
    return NextResponse.json(
      { message: "Error sending support message" },
      { status: 500 }
    );
  }
}