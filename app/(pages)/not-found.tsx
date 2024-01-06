"use client";

export default function NotFound() {
  return (
    <>
      <div className="w-screen h-screen fixed flex justify-center items-center bg-slate-900/70 backdrop-blur-lg z-[9999]">
        <h1 className="text-lg text-slate-300">Page Not Found</h1>
      </div>
    </>
  );
}
