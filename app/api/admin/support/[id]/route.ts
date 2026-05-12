import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Support from "@/app/models/support";
import { verifyAdmin } from "@/app/lib/adminAuth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    await verifyAdmin(req);

    const { id } = await params;
    const { reply } = await req.json();

    const updated = await Support.findByIdAndUpdate(
      id,
      {
        reply,
        status: "resolved",
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      support: updated,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Reply failed" },
      { status: 500 }
    );
  }
}