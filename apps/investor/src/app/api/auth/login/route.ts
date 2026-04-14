import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mock investor data (in production, fetch from Supabase)
const mockInvestors = [
  {
    id: "inv-001",
    email: "investor@example.com",
    password: "investor123",
    name: "Alexandra Chen",
    verificationStatus: "approved",
    shares: 50000,
    sharePrice: 5.0,
  },
  {
    id: "inv-002",
    email: "demo@spaceburial.com",
    password: "investor123",
    name: "Marcus Webb",
    verificationStatus: "approved",
    shares: 20000,
    sharePrice: 5.0,
  },
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find investor by email
    const investor = mockInvestors.find((inv) => inv.email === email);

    if (!investor) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND", message: "No investor account found with this email." },
        { status: 401 }
      );
    }

    // Validate password (in production, use bcrypt)
    if (investor.password !== password) {
      return NextResponse.json(
        { error: "INVALID_PASSWORD", message: "Invalid password." },
        { status: 401 }
      );
    }

    // Check verification status
    if (investor.verificationStatus !== "approved") {
      return NextResponse.json(
        { error: "VERIFICATION_REQUIRED", message: "Your verification is still pending." },
        { status: 403 }
      );
    }

    // Create session
    const sessionData = {
      userId: investor.id,
      email: investor.email,
      name: investor.name,
      role: "investor",
      verificationStatus: investor.verificationStatus,
    };

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("investor_session", JSON.stringify(sessionData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      success: true,
      user: sessionData,
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
