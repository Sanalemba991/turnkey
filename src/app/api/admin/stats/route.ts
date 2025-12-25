import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { withAuth } from "@/lib/auth";

const handler = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const totalContacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ status: "unread" });

    return NextResponse.json(
      {
        totalContacts,
        unreadContacts,
        totalNewsletter: 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
};

export const GET = withAuth(handler);
