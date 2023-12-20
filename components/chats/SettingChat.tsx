"use client";

import { Card, CardBody, List, ListItem } from "@material-tailwind/react";
import Link from "next/link";
import { HiPencil, HiShieldCheck } from "react-icons/hi2";

export default function SettingChat() {
  return (
    <>
      <Card placeholder="any" className="bg-slate-900">
        <CardBody
          placeholder="any"
          className="p-0 bg-blue-500/10 rounded-lg border border-blue-500/30"
        >
          <List placeholder="any">
            <Link href="/">
              <ListItem
                placeholder="any"
                className="px-4 py-3 flex items-center gap-2 hover:bg-blue-900/20 active:bg-blue-900/20 focus:bg-blue-900/2 text-slate-300 hover:text-white"
              >
                <HiPencil className="w-5 h-5" />
                Edit Profile
              </ListItem>
            </Link>
            <Link href="/">
              <ListItem
                placeholder="any"
                className="px-4 py-3 flex items-center gap-2 hover:bg-blue-900/20 active:bg-blue-900/20 focus:bg-blue-900/2 text-slate-300 hover:text-white"
              >
                <HiShieldCheck className="w-5 h-5" />
                Privacy and Policy
              </ListItem>
            </Link>
          </List>
        </CardBody>
      </Card>
    </>
  );
}
