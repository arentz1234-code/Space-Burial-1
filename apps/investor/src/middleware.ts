import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication and verification
const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/documents",
  "/dashboard/financials",
  "/dashboard/updates",
  "/dashboard/offering",
  "/dashboard/disclosures",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtectedRoute) {
    // Get session cookie
    const sessionCookie = request.cookies.get("investor_session");

    if (!sessionCookie?.value) {
      // No session - redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(sessionCookie.value);

      // Check if user is verified
      const verifiedStatuses = ["approved", "document_verified", "third_party_verified", "professional_verified"];

      if (!verifiedStatuses.includes(session.verificationStatus)) {
        // Not verified - redirect to pending page
        return NextResponse.redirect(new URL("/pending", request.url));
      }

      // User is authenticated and verified
      return NextResponse.next();
    } catch {
      // Invalid session - redirect to login
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
