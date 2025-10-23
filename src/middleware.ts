import { Playwrite_CL_Guides } from "next/font/google";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/login"];
  console.log("pathname ", pathname);

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  console.log("middleware", request);
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // kalau dia tidak punya accesstoken dan refreshtoken maka akan disuruh login
  if (pathname === "/admin") {
    console.log("Memeriksa akses ke /admin");
    if (!accessToken || !refreshToken) {
      console.log("Tidak ada cookie, redirect ke /login");
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl.href);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
