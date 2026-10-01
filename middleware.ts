import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login") || pathname.startsWith("/api/health") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }
  if (req.cookies.get("pulse_auth")?.value === "1") return NextResponse.next();
  // Allow first boot without password set? No — always gate, default is pulse-demo-1234.
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
