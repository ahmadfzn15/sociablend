"use client";

import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { HiChevronRight, HiEye, HiEyeSlash } from "react-icons/hi2";
import { Register as RegisterProcess } from "./register";
import { useRouter } from "next/navigation";

export default function Register() {
  return (
    <>
      <div className="bg-slate-800/40 backdrop-blur-md max-w-[30vw] w-full p-8 rounded-xl border border-blue-600/50 text-slate-300 flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <Reg1 />
      </div>
    </>
  );
}

const Reg1 = () => {
  const [pwd, setPwd] = useState(false);
  const [pwdConfirm, setPwdConfirm] = useState(false);
  const [data, setData] = useState<Auth.Register>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<string | null>(null);

  const route = useRouter();

  useEffect(() => {
    if (data.password && data.passwordConfirm) {
      if (data.password !== data.passwordConfirm) {
        setError("Password tidak sama");
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
  }, [data.passwordConfirm]);

  const registerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await RegisterProcess({ data })
      .then(() => {
        route.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={registerSubmit} className="w-full">
        <div className="w-full flex flex-col space-y-4">
          <div className="w-full">
            <Input
              crossOrigin
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
              crossOrigin
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
          <div className="w-full">
            <Input
              crossOrigin
              type={pwdConfirm ? "text" : "password"}
              label="Confirm Password"
              color="blue"
              className="text-slate-300"
              value={data?.passwordConfirm}
              onChange={(e) =>
                setData({ ...data, passwordConfirm: e.target.value })
              }
              icon={
                pwdConfirm ? (
                  <HiEye
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setPwdConfirm(!pwdConfirm)}
                  />
                ) : (
                  <HiEyeSlash
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setPwdConfirm(!pwdConfirm)}
                  />
                )
              }
            />
            {error && (
              <small className="text-sm text-red-600 mt-1 block">
                • {error}
              </small>
            )}
          </div>
          <Button
            placeholder="any"
            type="submit"
            color="blue"
            variant="outlined"
            // disabled
            className="flex items-center gap-1 self-end"
          >
            Next <HiChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </>
  );
};

const Reg2 = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full">
        <Input
          crossOrigin
          label="First Name"
          color="blue"
          className="text-slate-300"
        />
        {/* <small className="text-sm text-red-600 mt-1 block">
              • Field first name required
            </small> */}
      </div>
      <div className="w-full">
        <Input
          crossOrigin
          label="Last Name"
          color="blue"
          className="text-slate-300"
        />
        {/* <small className="text-sm text-red-600 mt-1 block">
              • Field last name required
            </small> */}
      </div>
      <div className="w-full">
        <Input
          crossOrigin
          type="date"
          label="Birth"
          color="blue"
          className="text-slate-300"
        />
        {/* <small className="text-sm text-red-600 mt-1 block">
              • Field last name required
            </small> */}
      </div>
      <Button
        placeholder="any"
        color="blue"
        variant="outlined"
        disabled
        className="flex items-center gap-1 self-end"
      >
        Next <HiChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
