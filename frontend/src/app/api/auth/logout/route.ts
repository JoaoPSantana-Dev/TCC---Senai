import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const jar = await cookies();
  jar.delete("session");
  jar.delete({ name: "pre_2fa", path: "/api/auth" });
  return NextResponse.json({ ok: true });
}
