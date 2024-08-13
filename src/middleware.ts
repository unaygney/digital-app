import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthPages, isSecuredPage, verifyJwtToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { url, cookies, nextUrl } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthpageRequested = isAuthPages(nextUrl.pathname);
  const isSecuredPageRequested = isSecuredPage(nextUrl.pathname);

  // Main page is not secured user can access it without token
  if (nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // If the page is secured and the user has a verified token, allow access (like settings page)
  if (isSecuredPageRequested) {
    if (hasVerifiedToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(new URL("/sign-in", url));
    return response;
  }

  // If the page is an auth page and the user has a verified token, redirect to the main page
  if (isAuthpageRequested) {
    if (hasVerifiedToken) {
      const response = NextResponse.redirect(new URL("/", url));
      return response;
    }
    const response = NextResponse.next();
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
