"use client";

import { auth } from "@/utils/firebase-config";
import { Button, Card, CardBody, IconButton } from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiChevronLeft, HiPower, HiTrash, HiUser } from "react-icons/hi2";
import { logout } from "./logout";

export default function Account() {
  const route = useRouter();

  const handleSignOut = () => {
    logout()
      .then((res) => {
        route.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card placeholder="any" className="bg-slate-900/70">
        <CardBody
          placeholder="any"
          className="p-2 flex flex-col divide-y divide-slate-700 bg-blue-500/10 rounded-lg border border-blue-500/30"
        >
          <div className="mb-2 flex items-center gap-1">
            <Link href="/setting">
              <IconButton
                placeholder
                color="blue"
                variant="text"
                className="rounded-full"
              >
                <HiChevronLeft className="w-7 h-7" />
              </IconButton>
            </Link>
            <h1 className="text-2xl font-semibold text-slate-300">Account</h1>
          </div>
          <Button
            placeholder
            color="blue"
            variant="text"
            fullWidth
            className="p-3 flex items-center gap-3 text-slate-300 capitalize font-medium rounded-none"
          >
            <HiUser className="w-5 h-5" />
            <div className="flex flex-col items-start justify-between">
              <h1 className="text-base">Account Information</h1>
              <h1 className="text-slate-400">
                Information for your account and more .
              </h1>
            </div>
          </Button>
          <Button
            placeholder
            color="blue"
            variant="text"
            fullWidth
            className="p-3 flex items-center gap-3 text-slate-300 capitalize font-medium rounded-none"
            onClick={handleSignOut}
          >
            <HiPower className="w-5 h-5" />
            <div className="flex flex-col items-start justify-between">
              <h1 className="text-base">Sign out</h1>
              <h1 className="text-slate-400">Sign out from this account</h1>
            </div>
          </Button>
          <Button
            placeholder
            color="red"
            variant="text"
            fullWidth
            className="p-3 flex items-center gap-3 text-red-500 capitalize font-medium rounded-t-none"
          >
            <HiTrash className="w-5 h-5" />
            <div className="flex flex-col items-start justify-between">
              <h1 className="text-base">Delete Account</h1>
              <h1 className="text-red-600">
                Delete My Account, please be carefull !
              </h1>
            </div>
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
