"use client";

import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi2";

export default function BubbleChatCommunity({
  profilePhoto,
  name,
  children,
  time = "-",
  right,
}: {
  profilePhoto?: string;
  name?: string;
  children: React.ReactNode;
  time?: string;
  right: boolean;
}) {
  return (
    <>
      {right ? (
        <div className="w-full flex justify-end">
          <div className="px-5 py-3 max-w-[75%] bg-slate-800 rounded-s-xl rounded-ee-xl relative group">
            <div className="group-hover:visible invisible absolute top-0 right-0 p-0">
              <Menu>
                <MenuHandler>
                  <IconButton
                    placeholder="any"
                    color="blue"
                    variant="text"
                    size="sm"
                    className="rounded-xl"
                  >
                    <HiChevronDown className="w-3 h-3" />
                  </IconButton>
                </MenuHandler>
                <MenuList
                  placeholder="any"
                  className="bg-slate-900 text-slate-300 border-slate-700 "
                >
                  <MenuItem placeholder="any">Delete Message</MenuItem>
                  <MenuItem placeholder="any">Copy Message</MenuItem>
                  <MenuItem placeholder="any">Share Message</MenuItem>
                </MenuList>
              </Menu>
            </div>
            {children}
            <small className="text-[10px]">{time}</small>
            <div className="w-5 h-5 triangle-right"></div>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-3 justify-start">
          <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
            <img src={profilePhoto} alt="" />
          </div>
          <div className="px-5 py-3 max-w-[75%] bg-slate-800 rounded-b-xl rounded-se-xl relative group flex flex-col gap-1">
            <h1 className="font-semibold text-green-500">{name}</h1>
            <div className="group-hover:visible invisible absolute top-0 right-0 p-0">
              <Menu>
                <MenuHandler>
                  <IconButton
                    placeholder="any"
                    color="blue"
                    variant="text"
                    size="sm"
                    className="rounded-xl"
                  >
                    <HiChevronDown className="w-3 h-3" />
                  </IconButton>
                </MenuHandler>
                <MenuList
                  placeholder="any"
                  className="bg-slate-900 text-slate-300 border-slate-700 "
                >
                  <MenuItem placeholder="any">Delete Message</MenuItem>
                  <MenuItem placeholder="any">Copy Message</MenuItem>
                  <MenuItem placeholder="any">Share Message</MenuItem>
                </MenuList>
              </Menu>
            </div>
            {children}
            <small className="text-[10px]">{time}</small>
            <div className="w-5 h-5 triangle-left"></div>
          </div>
        </div>
      )}
    </>
  );
}
