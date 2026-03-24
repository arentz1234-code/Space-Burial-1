import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require investor authentication and verification
const PROTECTED_INVESTOR_ROUTES = [
  "/investor/dashboard",
  "/investor/dashboard/documents",
  "/investor/dashboard/financials",
  "/investor/dashboard/updates",
  "/investor/dashboard/offering",
  "/investor/dashboard/disclosures",
];

// Routes that only require authentication (not verification)
const AUTH_ONLY_ROUTES = [
  "/investor/verification-pending",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected investor route
  const isProtectedRoute = PROTECTED_INVESTOR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtectedRoute || isAuthOnlyRoute) {
    // Get session cookie
    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie?.value) {
      // No session - redirect to login
      const loginUrl = new URL("/investor/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(sessionCookie.value);

      // Check if user is an investor
      if (session.role !== "investor") {
        // Not an investor - redirect to appropriate dashboard
        const dashboardUrls: Record<string, string> = {
          admin: "/admin/dashboard",
          immortal: "/immortal/dashboard",
        };
        return NextResponse.redirect(
          new URL(dashboardUrls[session.role] || "/", request.url)
        );
      }

      // For protected routes, check verification status
      if (isProtectedRoute) {
        const verificationStatus = session.verificationStatus || "self_certified";

        // Only allow fully verified investors to access the dashboard
        const verifiedStatuses = ["document_verified", "third_party_verified", "professional_verified"];

        if (!verifiedStatuses.includes(verificationStatus)) {
          // Not verified - redirect to verification pending page
          return NextResponse.redirect(
            new URL("/investor/verification-pending", request.url)
          );
        }
      }

      // User is authenticated and verified (or on auth-only route)
      return NextResponse.next();
    } catch {
      // Invalid session - redirect to login
      const loginUrl = new URL("/investor/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/investor/dashboard/:path*",
    "/investor/verification-pending/:path*",
  ],
};
