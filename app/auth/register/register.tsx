import { auth } from "@/utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function Register({ data }: { data: Auth.Register }) {
  try {
    await createUserWithEmailAndPassword(auth, data.email!, data.password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    return error;
  }
}
