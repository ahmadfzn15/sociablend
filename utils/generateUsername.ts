import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase-config";

const allowedChars = Array.from({ length: 62 }, (_, i) =>
  String.fromCharCode(i + (i < 26 ? 97 : 65 - 26) + (i < 52 ? 0 : 48 - 52))
);

export const generateUsername = async () => {
  const prefix = "user-";
  const usernameLength = 5;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const username = Array.from(
      { length: usernameLength },
      () => allowedChars[Math.floor(Math.random() * allowedChars.length)]
    ).join("");
    const result = prefix + username;

    const users = await getDocs(
      query(collection(firestore, "users"), where("username", "==", result))
    );

    if (users.empty) {
      return result;
    } else {
      attempts++;
    }
  }

  throw new Error("Failed to generate unique username after multiple attempts");
};
