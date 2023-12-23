"use client";

import { firestore } from "@/utils/firebase-config";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from ".";
import Loading from "../(pages)/loading";

export const ChatContext = React.createContext<{
  data: DocumentData | null;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}>({ data: null, reload: false, setReload: () => {} });

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [reload, setReload] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [data, setData] = useState<DocumentData | null>(null);
  const route = useRouter();
  const { chat } = useParams();
  const { user } = useContext(PageContext);

  useEffect(() => {
    const unsubscribe = async () => {
      const chatRoom = await getDoc(doc(firestore, "chatRoom", chat[0]));
      const res = await getDoc(doc(firestore, "users", chat[1]));
      if (chatRoom.exists() && res.exists()) {
        const idUser = [user.id, res.id];

        const check = idUser.every((value) =>
          chatRoom.data().participants.includes(value)
        );
        if (check) {
          setData({
            user: {
              senderID: user.id,
              receiver: { id: res.id, ...res.data() },
            },
            idRoom: chatRoom.id,
          });
          setValid(true);
        } else {
          return route.push("/chats");
        }
      } else {
        return route.push("/chats");
      }
    };

    unsubscribe();
  }, []);

  return (
    <ChatContext.Provider value={{ data, reload, setReload }}>
      {valid ? children : <Loading />}
    </ChatContext.Provider>
  );
};
