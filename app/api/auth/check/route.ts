import { Crypto } from "@/utils/crypto";
import { app, initializeFirebaseAdmin } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    await initializeFirebaseAdmin();

    const cookie = req.headers.get("Cookie");
    if (!cookie) {
      return NextResponse.json(
        { authenticate: false, data: cookie },
        {
          status: 401,
        }
      );
    }

    const decodedToken = Crypto.decrypt(cookie);
    const verifyToken = (await app()).verifySessionCookie(decodedToken);
    if (!verifyToken) {
      return NextResponse.json(
        { authenticate: false },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      { authenticate: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticate: error },
      {
        status: 401,
      }
    );
  }
}
