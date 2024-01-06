"use client";

import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Input,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import {
  HiEllipsisVertical,
  HiFaceFrown,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import LoadCardChat from "../loading/loadCardChat";
import {
  and,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "@/utils/firebase-config";
import { PageContext } from "@/app/context";
import moment from "moment";
import { Crypto } from "@/utils/crypto";

interface User {
  id: string;
  photoProfile: string;
  username: string;
}

interface Message {
  message: string;
  time: string;
}

interface Data {
  roomID: string;
  userDetail: User;
  lastMessage: Message;
  messageReaded: number | null;
}

export default function CardChat() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [datas, setDatas] = useState<Data[] | null>(null);
  const [data, setData] = useState<Data[]>();
  const [messageUnread, setMessageUnread] = useState<number | null>(null);
  const { user } = useContext(PageContext);

  useEffect(() => {
    const getChatRoom = async () => {
      const getUser = async (id: string) => {
        const res = (await getDoc(doc(firestore, "users", id))).data();
        return {
          id,
          photoProfile: res!.photoProfile,
          username: res!.username,
        };
      };

      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "chatRoom"),
          and(
            where("participants", "array-contains", user!.id),
            where("active", "==", true)
          )
        ),
        async (snapshot) => {
          const result = await Promise.all(
            snapshot.docs.map(async (d) => {
              const roomID: string = d.id;
              const room = d.data();
              const userDetail: User = await getUser(
                room.participants.find((d: string) => d !== user!.id)
              );
              const message = await getDocs(
                query(
                  collection(firestore, "chat"),
                  where("roomID", "==", d.id),
                  orderBy("created_at", "desc")
                )
              );
              const lastMessage: Message = message.docs.map((d) => ({
                message:
                  d.data().type == "text"
                    ? d.data().message
                    : `${userDetail.username} send a ${d.data().type}`,
                notReaded:
                  message.docs.filter((d) => !d.data().readed).length > 0
                    ? message.docs.filter((d) => !d.data().readed).length
                    : null,
                time: moment(d.data().created_at).format("HH.mm"),
              }))[0];

              const messageReaded = !message.empty
                ? message.docs.filter((d) => !d.data().readed).length
                : null;

              return {
                roomID,
                userDetail,
                lastMessage,
                messageReaded,
              };
            })
          );
          setData(result);
        }
      );
      return () => unsubscribe();
    };

    getChatRoom();
  }, []);

  const decryptMessage = (text: string) => {
    const msg = Crypto.decrypt(text);
    return msg;
  };

  const deleteChatRoom = async (id: string) => {
    const chat = await getDocs(
      query(collection(firestore, "chat"), where("roomID", "==", id))
    );
    const deleted = chat.docs.map(async (d) => {
      const dataDelete = d.data().deleted_id;
      if (dataDelete && dataDelete !== user.id) {
        await deleteDoc(doc(firestore, "message", d.id));
      }
      if (!dataDelete) {
        await updateDoc(doc(firestore, "message", d.id), {
          deleted_id: user.id,
        });
      }
    });
    const deleteRoom = async () => {
      const chats = await getDoc(doc(firestore, "chatRoom", id));
      const deleteChat = chats.data()!.deleted_id;
      if (deleteChat && deleteChat !== user.id) {
        await deleteDoc(doc(firestore, "chatRoom", id));
      }
      if (!deleteChat) {
        await updateDoc(doc(firestore, "chatRoom", id), {
          deleted_id: user.id,
        });
      }
    };

    await Promise.all([chat, deleted, deleteRoom]);
  };

  const clearChatRoom = async (id: string) => {
    const chat = await getDocs(
      query(collection(firestore, "chat"), where("roomID", "==", id))
    );
    const deleteMessage = chat.docs.map(async (d) => {
      const dataDelete = d.data().deleted_id;
      if (dataDelete && dataDelete !== user.id) {
        await deleteDoc(doc(firestore, "message", d.id));
      }
      if (!dataDelete) {
        await updateDoc(doc(firestore, "message", d.id), {
          deleted_id: user.id,
        });
      }
    });

    await Promise.all([chat, deleteMessage]);
  };

  const readChatRoom = async (id: string) => {
    await updateDoc(doc(firestore, "chatroom", id), {
      read: false,
    });
  };

  const pinChatRoom = async (id: string) => {
    const res = await getDoc(doc(firestore, "chatRoom", id));
    const result = res.data()!.result.pinned_id.includes(user.id);
    if (result) {
      await updateDoc(doc(firestore, "chatroom", id), {
        pinned_id: arrayRemove(user.id),
      });
    } else {
      await updateDoc(doc(firestore, "chatroom", id), {
        pinned_id: arrayUnion(user.id),
      });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const res = data!.filter((d) =>
        d.userDetail.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDatas(res);
    } else {
      setDatas(data!);
    }
  }, [searchQuery]);

  return (
    <>
      <Card placeholder="any" className="bg-slate-900">
        <CardBody
          placeholder="any"
          className="space-y-3 p-2 bg-blue-500/10 rounded-xl ring-1 ring-blue-500/30"
        >
          <div>
            <Input
              crossOrigin="true"
              color="blue"
              label="Search"
              className="text-slate-300"
              size="lg"
              icon={<HiMagnifyingGlass className="w-6 h-6 text-white" />}
              value={searchQuery!}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <h1 className="text-slate-300 text-base mt-1">
                {datas && datas.length} Result
              </h1>
            )}
          </div>
          <div className="flex flex-col items-center gap-1 py-1">
            {data ? (
              data.length != 0 ? (
                data.map((d, i) => (
                  <div key={i} className="flex items-center w-full">
                    <Link
                      href={`/chats/${d.roomID}/${d.userDetail.id}`}
                      className="w-full"
                    >
                      <ListItem
                        placeholder="any"
                        className="px-3 py-2 hover:bg-blue-900/20 active:bg-blue-900/20 focus:bg-blue-900/20"
                      >
                        <ListItemPrefix placeholder="any">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-blue-600">
                              <img
                                src={
                                  d.userDetail.photoProfile ?? "/img/user.png"
                                }
                                alt={d.userDetail.username}
                              />
                            </div>
                            <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
                          </div>
                        </ListItemPrefix>
                        <div className="flex flex-col justify-between">
                          <Typography
                            placeholder="any"
                            variant="paragraph"
                            color="white"
                          >
                            {d.userDetail.username}
                          </Typography>
                          <small className="text-slate-300">
                            {d.lastMessage &&
                              decryptMessage(d.lastMessage.message)}
                          </small>
                          <small className="text-slate-300 text-xs">
                            {d.lastMessage?.time}
                          </small>
                        </div>
                        <ListItemSuffix placeholder="any">
                          {(d.messageReaded && d.messageReaded) !== 0 && (
                            <Chip
                              value={d.messageReaded}
                              color="blue"
                              className="rounded-full"
                            />
                          )}
                        </ListItemSuffix>
                      </ListItem>
                    </Link>
                    <Menu>
                      <MenuHandler>
                        <IconButton
                          placeholder="any"
                          color="blue"
                          variant="text"
                          className="rounded-full focus:outline-none"
                        >
                          <HiEllipsisVertical className="w-7 h-7" />
                        </IconButton>
                      </MenuHandler>
                      <MenuList
                        placeholder="any"
                        className="bg-slate-900/60 backdrop-blur-md border-slate-700 "
                      >
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                          onClick={() => pinChatRoom(d.roomID)}
                        >
                          Delete Chat
                        </MenuItem>
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                          onClick={() => deleteChatRoom(d.roomID)}
                        >
                          Delete Chat
                        </MenuItem>
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                          onClick={() => clearChatRoom(d.roomID)}
                        >
                          Clear Chat
                        </MenuItem>
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                          onClick={() => readChatRoom(d.roomID)}
                        >
                          Mark as unread
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                ))
              ) : (
                <div className="w-full h-60 flex justify-center items-center">
                  <h1 className="text-3xl font-semibold text-slate-300 flex items-center gap-2">
                    <HiFaceFrown className="w-20 h-20" /> Nothing Chat
                  </h1>
                </div>
              )
            ) : (
              <LoadCardChat />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
