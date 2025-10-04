import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "/wishlist"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Auth logic only
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const token = req.cookies.get("token")?.value;
  const isLoggedIn = token && token !== "";

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/wishlist", "/login", "/signup"],
};
