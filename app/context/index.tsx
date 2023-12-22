"use client";

import { auth } from "@/utils/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PageContext = React.createContext<{
  user: User | null;
  loading: boolean;
}>({ user: null, loading: true });

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        route.push("/auth/login");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <PageContext.Provider value={{ user, loading }}>
      {loading ? <h1>Loading...</h1> : children}
    </PageContext.Provider>
  );
};
