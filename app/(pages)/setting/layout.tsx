import SidebarSetting from "@/components/setting/SidebarSetting";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[calc(100vw-29rem)] p-10">{children}</div>
      <SidebarSetting />
    </>
  );
}
