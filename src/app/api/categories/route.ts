import { NextResponse } from "next/server";

const BASE_URL = "https://api.escuelajs.co/api/v1/categories";

export const GET = async () => {
  const res = await fetch(BASE_URL, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return NextResponse.json(data);
};
