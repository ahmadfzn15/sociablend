"use client";

import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { HiArrowRightOnRectangle, HiEye, HiEyeSlash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Login as LoginProcess } from "./login";

export default function Login() {
  return (
    <>
      <div className="bg-slate-800/70 backdrop-blur-md max-w-[40vw] w-full p-8 rounded-xl border border-blue-600/50 text-slate-300 flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <Signin />
      </div>
    </>
  );
}

const Signin = () => {
  const [pwd, setPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Auth.Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const route = useRouter();

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await LoginProcess({ data })
      .then((res) => {
        console.log(res);
        setLoading(false);
        route.push("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={loginSubmit} className="w-full">
        <div className="w-full flex flex-col space-y-4">
          <div className="w-full">
            <Input
              crossOrigin="true"
              label="email"
              color="blue"
              className="text-slate-300"
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {/* <small className="text-sm text-red-600 mt-1 block">
              • Field first name required
            </small> */}
          </div>
          <div className="w-full">
            <Input
              crossOrigin="true"
              type={pwd ? "text" : "password"}
              label="Password"
              color="blue"
              className="text-slate-300"
              value={data?.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              icon={
                pwd ? (
                  <HiEye
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setPwd(!pwd)}
                  />
                ) : (
                  <HiEyeSlash
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setPwd(!pwd)}
                  />
                )
              }
            />
            {/* <small className="text-sm text-red-600 mt-1 block">
              • Field last name required
            </small> */}
          </div>
          <Button
            placeholder="any"
            type="submit"
            color="blue"
            variant="gradient"
            fullWidth
            disabled={loading}
            className="flex justify-center items-center gap-1"
          >
            <HiArrowRightOnRectangle className="w-4 h-4" /> Sign in
          </Button>
        </div>
      </form>
    </>
  );
};
