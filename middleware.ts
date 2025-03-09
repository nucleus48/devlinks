import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/lib/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path === "/";
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie!);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!isProtectedRoute && session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  await updateSession();
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|.*\\.png$).*)"],
};
