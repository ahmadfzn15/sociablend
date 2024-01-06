"use client";

import { sidebarSetting } from "@/utils/sidebarSetting";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarSetting() {
  const route = usePathname();

  return (
    <>
      <div
        className={`${
          route === "/setting" ? "flex" : "hidden lg:flex"
        } max-w-[90%] w-full mx-auto rounded-lg lg:rounded-none lg:max-w-max lg:m-0 lg:w-60 lg:fixed lg:top-0 lg:right-0 lg:h-screen bg-slate-900 lg:shadow-md shadow-blue-700/50 shadow-none drop-shadow-[0_0_5px_rgba(37,99,235,0.5)] flex-col gap-4 lg:gap-10 items-center px-3 py-5`}
      >
        <Typography
          placeholder="any"
          variant="h3"
          className="text-slate-300 z-10"
        >
          Setting
        </Typography>
        <div className="flex flex-col gap-2 items-center w-full">
          {sidebarSetting.map((d, i) => (
            <Link key={i} href={d.link} className="w-full">
              <Button
                placeholder="any"
                color="blue"
                variant={route === d.link ? "gradient" : "text"}
                className="flex items-center gap-2 text-slate-300"
                fullWidth
              >
                {React.createElement(d.icon, { className: "w-5 h-5" })}
                {d.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
