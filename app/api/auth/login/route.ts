import { Crypto } from "@/utils/crypto";
import { app, initializeFirebaseAdmin } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    await initializeFirebaseAdmin();

    const authorization = req.headers.get("Authorization");
    if (authorization?.startsWith("Bearer")) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await (await app()).verifyIdToken(idToken);

      if (decodedToken) {
        const expire = 7 * 24 * 3600;
        const expiresIn = expire * 1000;

        const sessionCookie = await (
          await app()
        ).createSessionCookie(idToken, {
          expiresIn,
        });
        const encryptToken = Crypto.encrypt(sessionCookie);

        const option = {
          name: "session",
          value: encryptToken,
          maxAge: expire,
          httpOnly: true,
          secure: true,
          sameSite: true,
        };

        cookies().set(option);

        return NextResponse.json(`Sign in Successfully`, {
          status: 200,
        });
      } else {
        return NextResponse.json(`Token validation failed`, {
          status: 401,
        });
      }
    } else {
      return NextResponse.json(
        `Authorization header is not in correct format`,
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(`Sign in Failed : ${error}`, {
      status: 500,
    });
  }
}
