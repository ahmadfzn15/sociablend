import { auth } from "@/utils/firebase-config";
import { signOut } from "firebase/auth";

export async function logout() {
  try {
    await signOut(auth);
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  } catch (err) {
    return null;
  }
}
