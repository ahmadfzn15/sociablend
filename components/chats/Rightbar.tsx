"use client";

import { Button } from "@material-tailwind/react";

export default function RightBar() {
  return (
    <>
      <div className="fixed h-screen right-0 top-0 bg-slate-900/80 w-64 hidden xl:flex flex-col px-2 py-4 items-center gap-2 shadow-md shadow-blue-700/50">
        <Button
          color="blue"
          variant="gradient"
          placeholder="any"
          fullWidth
          className="p-2 flex items-center gap-2"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
              <img src="/img/lusi.jpeg" alt="Photo Profile" />
            </div>
            <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
          </div>
          <div className="flex flex-col justify-between items-start">
            <h1>Lusi Kuraisin</h1>
            <small className="text-slate-300">P....</small>
          </div>
        </Button>
        <Button
          color="blue"
          variant="text"
          placeholder="any"
          fullWidth
          className="p-2 flex items-center gap-2"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
              <img src="/img/lusi.jpeg" alt="Photo Profile" />
            </div>
            <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
          </div>
          <div className="flex flex-col justify-between items-start">
            <h1>Lusi Kuraisin</h1>
            <small className="text-slate-300">P....</small>
          </div>
        </Button>
      </div>
    </>
  );
}
