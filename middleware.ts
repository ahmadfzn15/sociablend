import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  // const session = req.cookies.get("token");
  // if (session) {
  //     return NextResponse.next();
  //   }
  // } else {
  //   if (!req.nextUrl.pathname.startsWith("/auth")) {
  //     return NextResponse.redirect(new URL("/auth/login", req.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // }
  return NextResponse.next();
}
