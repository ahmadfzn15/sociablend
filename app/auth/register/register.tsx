import { auth, firestore } from "@/utils/firebase-config";
import { generateUsername } from "@/utils/generateUsername";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export async function Register({ data }: { data: Auth.Register }) {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      data.email!,
      data.password
    );
    const username = await generateUsername();
    await addDoc(collection(firestore, "users"), {
      uid: user.user.uid,
      profile_picture: null,
      username: username,
      name: null,
      email: data.email,
      telephone_number: null,
      bio: null,
      gender: null,
      born_date: null,
      visibility: "public",
      followers_id: arrayUnion(),
      following_id: arrayUnion(),
      block_id: arrayUnion(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    return "Sign up successfully!";
  } catch (error) {
    return error;
  }
}
