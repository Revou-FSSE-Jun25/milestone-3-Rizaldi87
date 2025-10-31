import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("role");
  cookieStore.delete("email");
  cookieStore.delete("name");

  return NextResponse.json({ message: "Logout success" });
}
