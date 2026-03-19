import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserByEmail, DEMO_CREDENTIALS } from "@/lib/mock-users";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Mock password validation (in production, use bcrypt.compare)
    const validPasswords: Record<string, string> = {
      [DEMO_CREDENTIALS.admin.email]: DEMO_CREDENTIALS.admin.password,
      [DEMO_CREDENTIALS.investor.email]: DEMO_CREDENTIALS.investor.password,
      [DEMO_CREDENTIALS.immortal.email]: DEMO_CREDENTIALS.immortal.password,
      "investor@example.com": "investor123",
      "memorial@example.com": "eternal123",
    };

    if (validPasswords[email] !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // For investor, check if NDA is signed
    if (user.role === "investor" && !user.ndaSigned) {
      return NextResponse.json(
        { error: "NDA_REQUIRED", userId: user.id },
        { status: 403 }
      );
    }

    // Set session cookie (mock - use proper JWT/session in production)
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Return redirect path based on role
    const redirectPaths = {
      admin: "/admin/dashboard",
      investor: "/investor/dashboard",
      immortal: "/immortal/dashboard",
    };

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirect: redirectPaths[user.role],
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
