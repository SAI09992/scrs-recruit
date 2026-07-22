import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // 1. Protect /admin routes - if not logged in, redirect to /scrsadmin
  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/scrsadmin", req.url));
  }

  // 2. If already logged in, redirect /scrsadmin or /login to /admin
  if ((pathname === "/scrsadmin" || pathname === "/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/scrsadmin", "/login"],
};
