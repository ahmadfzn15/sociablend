import { AES, enc } from "crypto-js";

export const Crypto = {
  encrypt(text: string): string {
    const encryptedText = AES.encrypt(
      text,
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString();
    return encryptedText;
  },

  decrypt(text: string): string {
    const decryptedText = AES.decrypt(
      text,
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString(enc.Utf8);
    return decryptedText;
  },
};
