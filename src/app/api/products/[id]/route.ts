import { cookies } from "next/headers";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export async function GET(_: Request, { params }: any) {
  const { id } = await params;
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();

  return Response.json(data);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { id } = await context.params;

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { id } = await context.params;

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  return Response.json({ success: res.ok });
}
