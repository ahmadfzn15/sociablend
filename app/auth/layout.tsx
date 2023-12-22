import { AuthProvider } from "../context/auth";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="w-screen h-screen flex justify-center items-center">
        {children}
      </div>
    </AuthProvider>
  );
}
