"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiArrowUpTray, HiXMark } from "react-icons/hi2";

export default function Modal() {
  const inputPhoto = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const changeMedia = (e: Blob) => {
    const url = URL.createObjectURL(e);
    setImageURL(url);
  };

  useEffect(() => {
    setImageURL(null);
  }, []);

  const route = useRouter();

  return (
    <>
      <Dialog
        open
        handler={() => {}}
        placeholder="any"
        className="bg-slate-800"
        animate={{
          unmount: { scale: 0, opacity: 0 },
          mount: { scale: 1, opacity: 1 },
        }}
        size={imageURL ? "xl" : "md"}
      >
        <DialogHeader
          placeholder="any"
          className="p-0 flex justify-center relative"
        >
          <div className="absolute -top-20">
            <IconButton
              placeholder="any"
              color="blue"
              size="lg"
              variant="text"
              className="rounded-full p-7 bg-blue-900/50"
              onClick={() => route.back()}
            >
              <HiXMark className="w-8 h-8" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody placeholder="any" className="flex text-slate-300 p-5 gap-5">
          {imageURL ? (
            <>
              <div className="w-[500px] h-[400px] flex justify-center items-center overflow-hidden rounded-lg">
                <Image src={imageURL!} width={500} height={400} alt="Image" />
              </div>
              <div className="w-full flex flex-col justify-between items-end">
                <Textarea
                  color="blue"
                  label="Description"
                  rows={10}
                  className="text-slate-300"
                />
                <Button
                  placeholder="any"
                  color="blue"
                  variant="gradient"
                  fullWidth
                >
                  Post
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <Button
                placeholder="any"
                variant="text"
                color="blue"
                className="bg-blue-900/10"
                onClick={() => inputPhoto.current?.click()}
              >
                <HiArrowUpTray className="w-20 h-20" />
              </Button>
              <Typography placeholder="any" variant="lead">
                Upload or drag your picture/video
              </Typography>
            </div>
          )}
          <input
            ref={inputPhoto}
            onChange={(e) => changeMedia(e.target.files![0])}
            type="file"
            className="hidden"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
