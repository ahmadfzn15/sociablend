"use client";

import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <>
      <div className="w-screen h-screen fixed flex justify-center items-center bg-slate-900/30 backdrop-blur-lg z-[9999]">
        <Spinner className="w-20 h-20" color="blue" />
      </div>
    </>
  );
}
