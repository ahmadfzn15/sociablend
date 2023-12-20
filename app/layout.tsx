import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-h-screen overflow-hidden max-w-screen antialiased blur-[0.4px]">
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}