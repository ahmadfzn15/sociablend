import { onHover } from "@/utils/sidebarLink";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function LinkButton({
  link,
  onHover,
  label,
}: {
  link: string;
  onHover: onHover;
  label: string;
}) {
  const [active, setActive] = useState<boolean>(false);
  const path = usePathname();
  const activePath = path === link || path.split("/")[1] === link.split("/")[1];

  return (
    <>
      <Link href={link} className="w-full z-10">
        <Button
          color="blue"
          variant={activePath ? "gradient" : "text"}
          fullWidth
          placeholder="any"
          className={`md:flex items-center gap-2 hidden ${
            activePath ? "text-white" : "text-blue-300"
          }`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          {active || activePath
            ? React.createElement(onHover.after, { className: "w-5 h-5" })
            : React.createElement(onHover.before, { className: "w-5 h-5" })}
          {label}
        </Button>
        <IconButton
          color="blue"
          variant={activePath ? "gradient" : "text"}
          fullWidth
          placeholder="any"
          className={`flex items-center gap-2 md:hidden ${
            activePath ? "text-white" : "text-blue-300"
          }`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          size="lg"
        >
          {active || activePath
            ? React.createElement(onHover.after, { className: "w-5 h-5" })
            : React.createElement(onHover.before, { className: "w-5 h-5" })}
        </IconButton>
      </Link>
    </>
  );
}
