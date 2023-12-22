import { auth } from "@/utils/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function Login({ data }: { data: Auth.Login }) {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      data.email!,
      data.password
    );

    if (res) {
      const result = await fetch("/api/auth/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await res.user.getIdToken()}`,
        },
      });

      if (result.status === 200) {
        return await result.json();
      }
    }
  } catch (error) {
    return error;
  }
}
