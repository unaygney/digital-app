import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthPages, isSecuredPage, verifyJwtToken } from "./lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function middleware(request: NextRequest) {
  const { url, cookies, nextUrl } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthpageRequested = isAuthPages(nextUrl.pathname);
  const isSecuredPageRequested = isSecuredPage(nextUrl.pathname);

  // if user is not logged in, create a new session id
  let sessionId = cookies.get("session_id")?.value;

  // If user is not logged in and doesn't have a sessionId, create one
  if (!hasVerifiedToken && !sessionId) {
    sessionId = uuidv4();
    const response = NextResponse.next();
    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return response;
  }

  if (hasVerifiedToken && sessionId) {
    const response = NextResponse.next();
    response.cookies.delete("session_id");
    return response;
  }

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
