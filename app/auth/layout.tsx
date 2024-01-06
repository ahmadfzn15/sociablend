import { AuthProvider } from "../context/auth";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="w-screen h-screen flex justify-center items-center bg-slate-950">
        <div className="bg-slate-950 max-w-[80vw] sm:max-w-[60vw] md:max-w-[50vw] lg:max-w-[40vw] w-full p-8 rounded-xl drop-shadow-[0_0_5px_#2563eb] text-slate-300 flex flex-col gap-4 items-center overflow-hidden">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
