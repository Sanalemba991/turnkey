import { NextRequest, NextResponse } from "next/server";
import { generateToken, authenticateUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password required" },
        { status: 400 }
      );
    }

    // Try database first
    const user = await authenticateUser(username, password);
    if (user) {
      const token = generateToken({ username: user.username, role: user.role });
      return NextResponse.json(
        { token, message: "Login successful" },
        { status: 200 }
      );
    }

    // Fallback to environment variables for demo
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

    if (username === adminUsername && password === adminPassword) {
      const token = generateToken({ username, role: "admin" });
      return NextResponse.json(
        { token, message: "Login successful" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
