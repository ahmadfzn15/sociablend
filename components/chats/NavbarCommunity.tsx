"use client";

import {
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import {
  HiChevronLeft,
  HiEllipsisVertical,
  HiMagnifyingGlass,
} from "react-icons/hi2";

export default function NavbarCommunity() {
  const [search, setSearch] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 border border-blue-500/50 backdrop-blur-md rounded-full pl-2 pr-4 py-2.5 text-slate-300 flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <Link href="/chats">
            <IconButton
              placeholder="any"
              color="blue"
              variant="text"
              className="rounded-full focus:outline-none"
            >
              <HiChevronLeft className="w-6 h-6" />
            </IconButton>
          </Link>
          <div className="flex gap-3">
            <Link href="/lusi">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
                  <img src="/img/lusi.jpeg" alt="Photo Profile" />
                </div>
                <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
              </div>
            </Link>
            <div className="flex flex-col justify-between">
              <Link href="/lusi">
                <h1 className="">Javascript Club</h1>
              </Link>
              <small className="text-xs">Ahmad Fauzan, Lusi Kuraisin,...</small>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center">
            {search ? (
              <>
                <Input
                  crossOrigin
                  label="Search"
                  color="blue"
                  className="pr-10 text-slate-300"
                  autoFocus
                  onBlur={() => setSearch(false)}
                />
                <div className="absolute right-0 top-0">
                  <IconButton
                    placeholder="any"
                    color="blue"
                    variant="text"
                    className="rounded-full focus:outline-none"
                    onClick={() => setSearch(!search)}
                  >
                    <HiMagnifyingGlass className="w-6 h-6" />
                  </IconButton>
                </div>
              </>
            ) : (
              <Tooltip content="Search Message">
                <IconButton
                  placeholder="any"
                  color="blue"
                  variant="text"
                  className="rounded-full focus:outline-none"
                  onClick={() => setSearch(!search)}
                >
                  <HiMagnifyingGlass className="w-6 h-6" />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <Menu>
            <MenuHandler>
              <IconButton
                placeholder="any"
                color="blue"
                variant="text"
                className="rounded-full focus:outline-none"
              >
                <HiEllipsisVertical className="w-8 h-8" />
              </IconButton>
            </MenuHandler>
            <MenuList
              placeholder="any"
              className="bg-slate-900 text-slate-300 border-slate-700 "
            >
              <MenuItem placeholder="any" className="flex items-center gap-2">
                Mute Notification
              </MenuItem>
              <MenuItem placeholder="any" className="flex items-center gap-2">
                Walpaper
              </MenuItem>
              <Menu placement="left-start" offset={15}>
                <MenuHandler>
                  <MenuItem
                    placeholder="any"
                    className="flex items-center gap-2"
                  >
                    Other
                  </MenuItem>
                </MenuHandler>
                <MenuList
                  placeholder="any"
                  className="bg-slate-900 text-slate-300 border-slate-700 "
                >
                  <MenuItem
                    placeholder="any"
                    className="flex items-center gap-2"
                  >
                    Clear Chat
                  </MenuItem>
                  <MenuItem
                    placeholder="any"
                    className="flex items-center gap-2 text-red-500"
                  >
                    Block Profile
                  </MenuItem>
                </MenuList>
              </Menu>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}
