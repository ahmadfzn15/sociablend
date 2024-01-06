"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context/user";
import { useParams } from "next/navigation";

export default function Username() {
  const { username } = useParams();
  const { data } = useContext(UserContext);

  return (
    <>
      <div className=""></div>
    </>
  );
}
