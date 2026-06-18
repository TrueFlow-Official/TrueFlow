import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get("auth_token")?.value;
  const isAuthenticated = !!token;

  const isAuthRoute = AUTH_ROUTES.some((route) => nextUrl.pathname.startsWith(route));

  // If visiting the root path, redirect depending on auth status
  if (nextUrl.pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/org/acme-corp", request.url));
    }
    return NextResponse.next();
  }

  // 1. Unauthenticated users cannot access dashboard / organization routes
  if (!isAuthenticated && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users cannot access auth routes (login, register, etc.)
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/org/acme-corp", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - mockServiceWorker.js (MSW worker file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)",
  ],
};
