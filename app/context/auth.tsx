"use client";

import { auth } from "@/utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext<{
  loading: boolean;
}>({ loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        route.push("/home");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loading }}>
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};
