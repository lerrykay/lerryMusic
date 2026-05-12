import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Support from "@/app/models/support";

export async function GET() {
  try {
    await dbConnect();

    const supports = await Support.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      supports,
    });

  } catch (error) {
    console.log("SUPPORT FETCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch support messages",
      },
      { status: 500 }
    );
  }
}