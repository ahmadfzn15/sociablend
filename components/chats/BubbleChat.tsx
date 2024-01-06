"use client";

import { firestore } from "@/utils/firebase-config";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { HiChevronDown } from "react-icons/hi2";

export default function BubbleChat({
  children,
  time = "-",
  right,
  id,
}: {
  children: React.ReactNode;
  time?: string;
  right: boolean;
  id: string;
}) {
  const deleteMessage = async () => {
    await deleteDoc(doc(firestore, "message", id));
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(children?.toString()!);
  };

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
                  <MenuItem placeholder="any" onClick={deleteMessage}>
                    Delete Message
                  </MenuItem>
                  <MenuItem placeholder="any" onClick={copyMessage}>
                    Copy Message
                  </MenuItem>
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
        <div className="w-full flex gap-2 justify-start">
          <div className="px-5 py-3 max-w-[75%] bg-slate-800 rounded-b-xl rounded-se-xl relative group">
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
                  <MenuItem placeholder="any" onClick={deleteMessage}>
                    Delete Message
                  </MenuItem>
                  <MenuItem placeholder="any" onClick={copyMessage}>
                    Copy Message
                  </MenuItem>
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
