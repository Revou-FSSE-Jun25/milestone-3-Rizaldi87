import { cookies } from "next/headers";

const API_BASE = "https://api.escuelajs.co/api/v1/products";

export async function GET() {
  const res = await fetch(API_BASE, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return Response.json(data);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}
