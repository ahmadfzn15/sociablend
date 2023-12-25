"use client";

import LinkButton from "./LinkButton";
import { sidebarLink } from "@/utils/sidebarLink";

export default function Sidebar() {
  return (
    <>
      <div className="bg-slate-900/70 md:bg-slate-600/10 backdrop-blur-lg w-screen md:w-56 h-16 md:h-screen fixed md:left-0 bottom-0 flex md:flex-col gap-10 items-center px-3 py-7 shadow-md shadow-blue-700/50 z-50 overflow-hidden">
        <h1 className="text-slate-300 text-3xl font-semibold z-10 hidden md:block">
          SociaBlend
        </h1>
        <div className="flex md:flex-col md:gap-2 md:justify-start justify-evenly items-center w-full">
          {sidebarLink.map((d, i) => (
            <LinkButton
              key={i}
              link={d.link}
              onHover={d.onHover}
              label={d.label}
            />
          ))}
        </div>
      </div>
    </>
  );
}
