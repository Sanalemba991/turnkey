import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { withAuth } from "@/lib/auth";

const handler = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    if (request.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return NextResponse.json({ contacts }, { status: 200 });
    }

    if (request.method === "DELETE") {
      try {
        const body = await request.json();
        console.log('DELETE request body:', body);
        const { id } = body;

        if (!id) {
          console.log('No ID provided in DELETE request');
          return NextResponse.json(
            { message: "Contact ID is required" },
            { status: 400 }
          );
        }

        console.log('Attempting to delete contact with ID:', id);
        const result = await Contact.findByIdAndDelete(id);
        
        if (!result) {
          console.log('Contact not found with ID:', id);
          return NextResponse.json(
            { message: "Contact not found" },
            { status: 404 }
          );
        }

        console.log('Contact deleted successfully:', result._id);
        return NextResponse.json(
          { message: "Contact deleted successfully", contact: result },
          { status: 200 }
        );
      } catch (parseError) {
        console.error("Error parsing DELETE request:", parseError);
        return NextResponse.json(
          { message: "Invalid request body" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Contacts API error:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
};

export const GET = withAuth(handler);
export const DELETE = withAuth(handler);
