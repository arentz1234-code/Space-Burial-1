import { NextResponse } from "next/server";

// Simple mock auth — replace with NextAuth + DB in production
const MOCK_CREDENTIALS = {
  email: "demo@spaceburial.com",
  password: "investor123",
};

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    // In production: set a secure httpOnly cookie / JWT
    const response = NextResponse.json({ success: true });
    response.cookies.set("investor-auth", "authenticated", {
      httpOnly: true,
      secure: false, // Set true in production
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
