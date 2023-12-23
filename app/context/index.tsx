"use client";

import { auth, firestore } from "@/utils/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PageContext = React.createContext<{
  [key: string]: any;
}>({});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    [key: string]: any;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = async () => {
          await getDocs(
            query(collection(firestore, "users"), where("uid", "==", user.uid))
          )
            .then((res) => {
              setLoading(false);
              setUser({
                ...user,
                ...res.docs.map((d) => ({ id: d.id, ...d.data() }))[0],
              });
            })
            .catch((err) => {
              route.push("/auth/login");
              setUser({});
            });
        };
        data();
      } else {
        route.push("/auth/login");
        setUser({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <PageContext.Provider value={{ user }}>
      {loading ? <h1>Loading...</h1> : children}
    </PageContext.Provider>
  );
};
