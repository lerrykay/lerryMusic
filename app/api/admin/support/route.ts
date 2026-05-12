import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Support from "@/app/models/support";
import { verifyAdmin } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  try {
    await dbConnect();

    await verifyAdmin(req); 

    const supports = await Support.find()
      .populate("userId", "firstName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      supports,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error fetching support" },
      { status: 500 }
    );
  }
}