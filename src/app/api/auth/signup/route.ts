import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, password, tier, honoreeName, phone } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Check if email already exists in database
    // 2. Hash the password
    // 3. Save user to database
    // 4. Create a proper session/JWT

    // For now, create user data to be stored client-side
    const userId = `imm-${Date.now()}`;
    const joinDate = new Date().toISOString().split("T")[0];

    const userData = {
      id: userId,
      name,
      email,
      phone: phone || null,
      role: "immortal" as const,
      status: "active" as const,
      joinDate,
      tier,
      honoreeName: honoreeName || null,
    };

    const sessionData = {
      userId,
      email,
      name,
      role: "immortal" as const,
      tier,
      honoreeName: honoreeName || null,
      phone: phone || null,
    };

    // Set session cookie (auto-login)
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: false, // Allow client-side access for this mock implementation
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      success: true,
      user: userData,
      redirect: "/immortal/dashboard",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
