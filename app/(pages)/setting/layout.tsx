import SidebarSetting from "@/components/setting/SidebarSetting";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[95%] mx-auto lg:m-0 lg:max-w-[calc(100vw-29rem)] p-4 lg:p-10">
        {children}
      </div>
      <SidebarSetting />
    </>
  );
}
