import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/api";

const PUBLIC_ROUTES = ["/", "/login"];

const PROTECTED_METHODS = ["POST", "PUT", "DELETE"];

const PROTECTED_API_PATH = "/api/products";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("_next") || pathname.includes(".")) return NextResponse.next();

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (pathname.startsWith("/login") && accessToken && refreshToken) {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const user = await res.json();
        const redirectTo = user.role === "admin" ? "/admin" : "/store";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  }

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    if (!accessToken || !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const user = await res.json();
    if (user.role !== "admin") {
      return new NextResponse("Forbidden - Admin only", { status: 403 });
    }
  }

  if (pathname.startsWith(PROTECTED_API_PATH) && PROTECTED_METHODS.includes(request.method)) {
    if (!accessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    //cek role untuk post, put, delete
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await res.json();
    console.log("User Role:", user.role);
    if (user.role !== "admin") {
      return new NextResponse("Forbidden - adminu only", { status: 403 });
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
