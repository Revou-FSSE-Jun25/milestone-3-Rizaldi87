import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "https://api.escuelajs.co/api/v1/auth/login";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    return new Response("Gagal login", { status: 401 });
  }

  const data = await res.json();

  const cookiesStore = await cookies();

  cookiesStore.set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 30, // 30 minutes
  });

  cookiesStore.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 30, // 30 minutes
  });

  return NextResponse.json({ message: "Login success" });
}
