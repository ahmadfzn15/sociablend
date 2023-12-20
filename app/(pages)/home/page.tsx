"use client";

import CardPost from "@/components/home/CardPost";
import { Button } from "@material-tailwind/react";
import { HiPlus } from "react-icons/hi2";

export default function Home() {
  return (
    <>
      <div className="py-0 md:pt-10 lg:px-20 pb-20 flex">
        <div className="flex flex-col gap-10 w-[90%] mx-auto pt-10 md:pt-0 lg:m-0 lg:w-[80%]">
          <CardPost
            photoProfile="/img/lusi.jpeg"
            name="Lusi"
            content="/img/img.jpg"
            description="Ngoding First Time"
            time="15 minutes ago"
          />
          <CardPost
            photoProfile="/img/user.png"
            name="User"
            content="/img/img.jpg"
            description="Gabut"
            time="30 minutes ago"
          />
          <CardPost
            photoProfile="/img/user.png"
            name="User"
            content="/img/img.jpg"
            description=""
            time="1 hour ago"
          />
        </div>
        <div className="fixed right-16 pt-3 pb-5 px-5 rounded-lg overflow-y-auto ring-1 ring-blue-600 bg-slate-950 hidden lg:flex md:flex-col gap-4 items-center text-slate-300">
          <h1 className="font-semibold text-xl hidden md:block">Story</h1>
          <Button
            placeholder="any"
            color="blue-gray"
            variant="gradient"
            className="w-16 md:w-20 h-16 md:h-20 rounded-full flex justify-center items-center p-0"
          >
            <HiPlus className="w-12 h-12" />
          </Button>
          <div className="w-16 md:w-20 h-16 md:h-20 rounded-full overflow-hidden flex justify-center items-center ring-4 ring-blue-600">
            <img src="/img/lusi.jpeg" alt="" />
          </div>
          <div className="w-16 md:w-20 h-16 md:h-20 rounded-full overflow-hidden flex justify-center items-center ring-4 ring-blue-600">
            <img src="/img/user.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
