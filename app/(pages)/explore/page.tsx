"use client";

import { AuthContext } from "@/app/context";
import { useContext } from "react";

export default function Explore() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="p-5 w-full h-full">
        <div className="w-full h-full bg-slate-900/80 rounded-lg">
          {user && user.email}
        </div>
      </div>
    </>
  );
}
