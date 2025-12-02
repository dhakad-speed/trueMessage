import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function proxy(request: NextRequest) {
  // const registration = request.cookies.get("registration_started")?.value;
  const { pathname } = request.nextUrl;
  const secretAuth = String(process.env.AUTH_SECRET);
  // const restrictedRoutesDuringAuthentication = ["/verify/"];
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/write",
    "/notification",
    "/messages",
  ];
  const publicRoutes = ["/login", "/register"];
  const token = await getToken({ secret: secretAuth, req: request });
  // if (
  //   restrictedRoutesDuringAuthentication.some((route) =>
  //     pathname.startsWith(route)
  //   ) &&
  //   registration
  // ) {
  //   return NextResponse.redirect(new URL("/register", request.url));
  // }
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    // setTimeout(() => {
    return NextResponse.redirect(new URL("/dashboard", request.url));
    // }, 1000);
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
