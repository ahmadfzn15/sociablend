"use client";

import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  HiCamera,
  HiDocument,
  HiMapPin,
  HiMusicalNote,
  HiPaperAirplane,
  HiPaperClip,
  HiPhoto,
  HiXMark,
} from "react-icons/hi2";
import { SendMessage } from "./sendMessage";
import { PageContext } from "@/app/context";
import { useParams } from "next/navigation";
import { ChatContext } from "@/app/context/chat";
import { DocumentData } from "firebase/firestore";

export default function TypeMessage() {
  const input = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [textLong, setTextLong] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<string[] | null>(null);
  const { data } = useContext(ChatContext);
  const { chat } = useParams();

  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      SendMessage({
        data,
        message,
        type: "text",
        idRoom: chat[0],
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files;
    const imageURL: File[] = [];

    if (targetFile) {
      const file = Array.from(targetFile);
      file.forEach((d) => {
        imageURL.push(d);
      });

      const linkImage = imageURL.map((d) => URL.createObjectURL(d));
      setFiles(linkImage);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col bg-slate-900/70 rounded-3xl mb-16 md:mb-0">
        {files && (
          <>
            <div className="w-full flex justify-center top-0">
              <IconButton
                placeholder="any"
                color="blue"
                variant="text"
                className="rounded-full"
                onClick={() => setFiles(null)}
              >
                <HiXMark className="w-5 h-5" />
              </IconButton>
            </div>
            <div className="px-4 py-2 flex gap-3 overflow-x-auto w-full custom-scrollbar">
              {files.map((d, i) => (
                <div
                  key={i}
                  className="w-60 h-60 overflow-hidden flex justify-center items-center rounded-lg shrink-0"
                >
                  <Image
                    src={d}
                    width={240}
                    height={240}
                    alt="Image Document"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <form onSubmit={submitMessage} className="w-full flex rounded-full">
          <div>
            <Menu placement="top-start">
              <MenuHandler>
                <Button
                  placeholder="any"
                  color="blue"
                  variant="text"
                  className="rounded-l-full bg-blue-700/10 pl-4 pr-3 py-2.5 border border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <HiPaperClip className="w-6 h-6" />
                </Button>
              </MenuHandler>
              <MenuList
                placeholder="any"
                className="bg-slate-900/60 backdrop-blur-md border-slate-700 text-slate-300"
              >
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  <HiCamera className="w-4 h-4" /> Camera
                </MenuItem>
                <MenuItem
                  placeholder="any"
                  className="flex items-center gap-2"
                  onClick={() => fileInput.current?.click()}
                >
                  <HiPhoto className="w-4 h-4" /> Galery
                </MenuItem>
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  <HiDocument className="w-4 h-4" /> Document
                </MenuItem>
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  <HiMusicalNote className="w-4 h-4" /> Audio
                </MenuItem>
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  <HiMapPin className="w-4 h-4" /> Location
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            onChange={(e) => changeDocument(e)}
            accept="image/*, video/*"
            multiple
          />
          <textarea
            rows={1}
            className="w-full resize-none px-4 py-2.5 bg-transparent border border-blue-600 border-r-0 text-slate-300 focus:outline-none custom-scrollbar"
            ref={input}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here..."
            value={message}
          ></textarea>
          <div>
            <Button
              type="submit"
              placeholder="any"
              color="blue"
              variant="text"
              className="px-3 rounded-r-full rounded-l-none py-2.5 border border-blue-600 border-l-0"
            >
              <HiPaperAirplane className="w-6 h-6" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
