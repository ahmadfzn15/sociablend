"use client";

import Sidebar from "@/components/Sidebar";
import { PageProvider } from "../context";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (Notification.permission == "denied") {
      const getPermission = async () => {
        await Notification.requestPermission();
      };

      getPermission();
    }
  }, []);

  return (
    <PageProvider>
      <div className="body w-full h-full">
        <Sidebar />
        <main className="w-screen md:max-w-[calc(100vw-14rem)] h-screen md:ml-56 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </PageProvider>
  );
}
