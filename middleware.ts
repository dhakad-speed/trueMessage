import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/write",
    "/notification",
    "/messages",
  ];
  const publicRoutes = ["/login", "/register"];

  const token = await getToken({
    req: request,
    secret: String(process.env.NEXTAUTH_SECRET),
  });
  console.log(token);

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/write",
    "/login",
    "/register",
    "/notification",
    "/verify/:username",
    "/messages",
  ],
};
