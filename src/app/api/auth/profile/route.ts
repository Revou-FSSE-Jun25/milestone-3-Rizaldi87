import { cookies } from "next/headers";

const BASE_URL = "https://api.escuelajs.co/api/v1/auth/profile";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return Response.json({ isAuthenticated: false, user: null }, { status: 200 });

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return Response.json({ isAuthenticated: false, user: null }, { status: 200 });
  }

  const user = await res.json();

  return Response.json({ isAuthenticated: true, user }, { status: 200 });
}
