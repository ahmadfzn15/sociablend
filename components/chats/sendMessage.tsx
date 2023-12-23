import { Crypto } from "@/utils/crypto";
import { firestore } from "@/utils/firebase-config";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export async function SendMessage({
  data,
  message,
  type,
  idRoom,
}: {
  data: any;
  message: string;
  type: string;
  idRoom: string;
}) {
  try {
    const messageEncrypt = Crypto.encrypt(message);
    addDoc(collection(firestore, "message"), {
      roomID: idRoom,
      sender: data.user.senderID,
      receiver: data.user.receiver.id,
      message: messageEncrypt,
      type: type,
      readed: false,
      pinned_id: [],
      deleted_id: [],
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
      .then(async (res) => {
        const ref = doc(firestore, "chatRoom", idRoom);
        const check = (await getDoc(ref)).data();
        if (!check!.active) {
          await updateDoc(ref, {
            active: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}
