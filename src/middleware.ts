import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "wishlist"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const token = req.cookies.get("token")?.value;

  console.log(
    "Middleware running for:",
    pathname,
    "Token:",
    token,
    "IsLoggedIn:",
    !!(token && token !== "")
  );

  const isLoggedIn = token && token !== "";

  if (isProtectedRoute && !isLoggedIn) {
    console.log("Redirecting to login - protected route without token");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && isLoggedIn) {
    console.log("Redirecting to home - public route with token");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
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
