import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const option = {
      name: "session",
      value: "",
      maxAge: -1,
    };

    cookies().set(option);
    return NextResponse.json("Sign out successfully", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(`Sign in Failed : ${error}`, {
      status: 500,
    });
  }
}
