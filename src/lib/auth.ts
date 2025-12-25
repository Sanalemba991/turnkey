import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "./db";
import User from "./models/User";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function generateToken(payload: object, expiresIn: string = "24h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export async function authenticateUser(username: string, password: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      return { username: user.username, role: user.role };
    }
  } catch (error) {
    console.log("Database check failed, falling back to env");
  }
  return null;
}

export function withAuth(handler: Function) {
  return async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    return handler(request, decoded);
  };
}
