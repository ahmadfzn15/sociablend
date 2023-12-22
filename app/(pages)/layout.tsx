"use client";

import Sidebar from "@/components/Sidebar";
import { PageProvider } from "../context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageProvider>
      <Sidebar />
      <main className="w-screen md:max-w-[calc(100vw-14rem)] h-screen md:ml-56 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </PageProvider>
  );
}
