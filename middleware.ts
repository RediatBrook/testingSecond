
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = new Map<string, boolean>([
  ['/protected', true]
]);

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  if (!session && protectedPaths.get(path)) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && (path === "/" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}
