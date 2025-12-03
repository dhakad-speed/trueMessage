import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { logger } from "./src/lib/logger";

export async function middleware(request: NextRequest) {
  console.log("I am in middleware");
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
  logger.debug({ token, pathname }, "Middleware token check");

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    logger.info({ pathname }, "Redirecting unauthenticated user to register");
    return NextResponse.redirect(new URL("/register", request.url));
  }
  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    logger.info({ pathname }, "Redirecting authenticated user to dashboard");
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
