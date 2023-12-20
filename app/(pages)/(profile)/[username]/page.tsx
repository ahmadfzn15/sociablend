"use client";

import { useParams } from "next/navigation";

export default function Username() {
  const { username } = useParams();

  return (
    <>
      <h1 className="text-center text-slate-300">Hello from {username}</h1>
    </>
  );
}
