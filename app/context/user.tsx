"use client";

import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from ".";
import Loading from "../(pages)/loading";
import { firestore } from "@/utils/firebase-config";

export const UserContext = React.createContext<{
  data: DocumentData | null;
}>({ data: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DocumentData | null>(null);
  const route = useRouter();
  const { user } = useContext(PageContext);
  const { username } = useParams();

  useEffect(() => {
    const unsubscribe = async () => {
      const res = await getDocs(
        query(collection(firestore, "users"), where("username", "==", username))
      );
      if (!res.empty) {
        const result = res.docs[0].data().block_id.includes(user.id);

        if (!result) {
          setLoading(false);
          setData(res.docs.map((d) => d.data()));
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ data }}>
      {loading ? <Loading /> : data ? children : <h1>User Not Found</h1>}
    </UserContext.Provider>
  );
};
