import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Contact from "@/lib/models/Contact";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const newContact = new Contact({
      name,
      email,
      phone: phone || "",
      subject,
      message,
      status: "unread",
    });

    await newContact.save();

    return NextResponse.json(
      { message: "Contact message saved successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Failed to process contact request" },
      { status: 500 }
    );
  }
}
