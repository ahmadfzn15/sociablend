"use client";

import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Input,
  List,
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
import { useEffect, useState } from "react";
import {
  HiEllipsisVertical,
  HiFaceFrown,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import LoadCardChat from "../loading/loadCardChat";

interface Message {
  photoProfile: string;
  name: string;
  message: string;
}

export default function CardChat() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [datas, setDatas] = useState<Message[] | null>(null);

  const data: Message[] = [
    {
      photoProfile: "/img/lusi.jpeg",
      name: "Lusi Kuraisin",
      message: "P",
    },
    {
      photoProfile: "/img/user.png",
      name: "Ahmad Fauzan",
      message: "Heyy Lusiii...",
    },
    {
      photoProfile: "/img/user.png",
      name: "Anonymous",
      message: "Ppppppppppp",
    },
  ];

  useEffect(() => {
    if (searchQuery) {
      const res = data.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDatas(res);
    } else {
      setDatas(data);
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
            {datas ? (
              datas.length != 0 ? (
                datas.map((d, i) => (
                  <div key={i} className="flex items-center w-full">
                    <Link href="/chats/lusi" className="w-full">
                      <ListItem
                        placeholder="any"
                        className="px-3 py-2 hover:bg-blue-900/20 active:bg-blue-900/20 focus:bg-blue-900/20"
                      >
                        <ListItemPrefix placeholder="any">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-blue-600">
                              <img src={d.photoProfile} alt="Photo Profile" />
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
                            {d.name}
                          </Typography>
                          <small className="text-slate-300">{d.message}</small>
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
