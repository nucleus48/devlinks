import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/session";

const privateRoutes = ["/", "/profile"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = privateRoutes.includes(path);
  const cookie = await updateSession();

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!isProtectedRoute && cookie && !path.startsWith("/preview")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|.*\\.png$).*)"],
};
