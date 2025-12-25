import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    return NextResponse.json({ db: "connected", server: "online" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ db: "disconnected", server: "online" }, { status: 200 });
  }
}
