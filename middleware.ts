import { NextRequest, NextResponse } from "next/server";
import process from "process";

export async function middleware(req: NextRequest) {
  // const apiUrl =
  //   process.env.AUTH_API_URL || "http://localhost:3000/api/auth/check";

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // const cookie = req.cookies.get("session");

  // if (!cookie && !req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  // try {
  //   if (cookie) {
  //     const responseAPI = await fetch(apiUrl, {
  //       headers: {
  //         Cookie: cookie?.value,
  //       },
  //     });

  //     if (
  //       responseAPI.status !== 200 &&
  //       !req.nextUrl.pathname.startsWith("/auth")
  //     ) {
  //       return NextResponse.redirect(new URL("/auth/login", req.url));
  //     }

  //     if (
  //       req.nextUrl.pathname.startsWith("/auth") &&
  //       responseAPI.status === 200
  //     ) {
  //       return NextResponse.redirect(new URL("/home", req.url));
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error fetching authentication status:", error);
  //   return NextResponse.redirect(new URL("/error", req.url));
  // }

  return NextResponse.next();
}
