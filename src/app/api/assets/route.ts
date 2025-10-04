import { NextResponse } from "next/server";
import { assets } from "@/data/assets";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: assets,
    });
  } catch (error) {
    console.error("Assets API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assets" },
      { status: 500 }
    );
  }
}
