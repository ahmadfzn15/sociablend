import { ChatProvider } from "@/app/context/chat";
import NavbarProfile from "@/components/chats/NavbarProfile";
import RightBar from "@/components/chats/Rightbar";
import TypeMessage from "@/components/chats/TypeMessage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <div className="max-h-screen md:max-w-[calc(100vw-14rem)] xl:max-w-[calc(100vw-30rem)] w-full h-full fixed overflow-auto flex flex-col justify-between gap-2 py-2 px-3">
        <NavbarProfile />
        {children}
        <TypeMessage />
      </div>
      <RightBar />
    </ChatProvider>
  );
}
