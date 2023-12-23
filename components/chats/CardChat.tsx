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
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
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
}

export default function CardChat() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [datas, setDatas] = useState<Data[] | null>(null);
  const [data, setData] = useState<Data[]>();
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
                  collection(firestore, "message"),
                  where("roomID", "==", d.id),
                  orderBy("updated_at", "desc")
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

              return {
                roomID,
                userDetail,
                lastMessage,
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
              crossOrigin
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
                            {decryptMessage(d.lastMessage.message)}
                          </small>
                          <small className="text-slate-300 text-xs">
                            {d.lastMessage.time}
                          </small>
                        </div>
                        <ListItemSuffix placeholder="any">
                          <Chip
                            value="1"
                            color="blue"
                            className="rounded-full"
                          />
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
                        >
                          Delete Chat
                        </MenuItem>
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                        >
                          Clear Chat
                        </MenuItem>
                        <MenuItem
                          placeholder="any"
                          className="flex items-center gap-2"
                        >
                          Mark as read
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
