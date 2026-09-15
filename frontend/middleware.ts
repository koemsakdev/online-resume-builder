import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/resume-templates");

  const isAuthOrLandingPath =
    pathname === "/" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  // If user is logged in and visits landing page, sign-in, or sign-up, redirect directly to dashboard
  if (token && isAuthOrLandingPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT logged in and visits a protected route, redirect to sign-in
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/resume-templates/:path*",
  ],
};

