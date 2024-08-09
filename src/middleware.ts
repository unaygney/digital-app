import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthPages, verifyJwtToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { url, cookies, nextUrl } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthpageRequested = isAuthPages(nextUrl.pathname);

  if (nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/settings")) {
    if (hasVerifiedToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(new URL("/sign-in", url));
    return response;
  }

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
