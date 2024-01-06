"use client";

import { ChatContext } from "@/app/context/chat";
import BubbleChat from "@/components/chats/BubbleChat";
import { Crypto } from "@/utils/crypto";
import { firestore } from "@/utils/firebase-config";
import { IconButton } from "@material-tailwind/react";
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useRef, useState, useContext } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function Chat() {
  const chat = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState<boolean>(true);
  const { data } = useContext(ChatContext);
  const [message, setMessage] = useState<DocumentData[] | null>(null);

  const scrollToBottom = () => {
    chat.current?.scrollTo({
      top: chat.current.scrollHeight,
      behavior: "smooth",
    });
    setIsBottom(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "chat"),
        where("roomID", "==", data!.idRoom),
        orderBy("created_at", "asc")
      ),
      async (snapshot) => {
        const filter = snapshot.docs.filter((d) => !d.data().readed);
        const updatePromises = filter.map(async (d) => {
          try {
            await updateDoc(doc(firestore, "chat", d.id), {
              readed: true,
            });
          } catch (error) {
            console.error("Error updating document:", error);
          }
        });
        await Promise.all(updatePromises);
        const messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMessage(messages);
      }
    );

    return () => unsubscribe();
  }, []);

  const decryptMessage = (text: string) => {
    const msg = Crypto.decrypt(text);
    return msg;
  };

  const checkScroll = () => {
    const clientHeight = chat.current?.clientHeight!;
    const scrollHeight = chat.current?.scrollHeight!;
    const scrollTop = chat.current?.scrollTop!;
    const bottom = scrollHeight - clientHeight;

    if (scrollTop < bottom) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const clientHeight = chat.current?.clientHeight!;
    const scrollHeight = chat.current?.scrollHeight!;

    chat.current?.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });

    if (clientHeight === scrollHeight) {
      setIsBottom(false);
    } else {
      setIsBottom(true);
    }
  }, []);

  return (
    <>
      <div
        ref={chat}
        onScroll={checkScroll}
        className="h-full relative overflow-y-auto overflow-x-hidden custom-scrollbar text-slate-300 px-4"
      >
        <div className="w-full flex flex-col items-center gap-2">
          {message &&
            message.map((d, i) => (
              <BubbleChat
                key={i}
                time={moment(d.created_at).format("YYYY-mm-dd")}
                right={d.sender === data!.user.senderID}
                id={d.id}
              >
                <h1>{decryptMessage(d.message)}</h1>
              </BubbleChat>
            ))}
        </div>
        {isBottom && (
          <div className="absolute bottom-12 w-screen md:w-[calc(100vw-30rem)] flex justify-center">
            <div className="fixed">
              <IconButton
                placeholder="any"
                color="blue"
                variant="gradient"
                className="rounded-full"
                onClick={scrollToBottom}
              >
                <HiChevronDown className="w-7 h-7" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
