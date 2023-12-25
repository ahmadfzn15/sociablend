"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context/user";
import { useParams } from "next/navigation";

export default function Username() {
  const { username } = useParams();
  const { data } = useContext(UserContext);

  return (
    <>
      <h1 className="text-center text-slate-300">Hello from {username}</h1>
    </>
  );
}
