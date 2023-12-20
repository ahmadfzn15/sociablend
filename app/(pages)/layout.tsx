import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="w-screen md:max-w-[calc(100vw-14rem)] h-screen md:ml-56 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </>
  );
}
