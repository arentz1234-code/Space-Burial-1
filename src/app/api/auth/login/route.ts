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

    // Build session data with role-specific fields
    const sessionData: Record<string, unknown> = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Include verification status for investors (SEC compliance)
    if (user.role === "investor") {
      sessionData.verificationStatus = user.verificationStatus || "self_certified";
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: false, // Allow client-side access for this mock implementation
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Available across all pages
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
      user: sessionData,
      redirect: redirectPaths[user.role],
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
