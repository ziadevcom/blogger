export const config = { matcher: ["/login", "/register", "/posts/:path*"] };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublic = ["/login", "/register"].includes(path);

  const token = await getToken({ req });

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}
