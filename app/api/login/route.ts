import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  const expected = process.env.APP_PASSWORD || "pulse-demo-1234";
  if (password && password === expected) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("pulse_auth", "1", { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
    return res;
  }
  return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
}
