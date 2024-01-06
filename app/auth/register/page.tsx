"use client";

import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { HiChevronRight, HiEye, HiEyeSlash } from "react-icons/hi2";
import { Register as RegisterProcess } from "./register";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <Reg1 />
    </>
  );
}

const Reg1 = () => {
  const [pwd, setPwd] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    await RegisterProcess({ data })
      .then(() => {
        route.push("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={registerSubmit} className="w-full space-y-2">
        <div className="w-full flex flex-col space-y-4 mb-7">
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
          <div className="w-full">
            <Input
              crossOrigin="true"
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
          Sign up
        </Button>
        <h1 className="text-xs sm:text-sm font-semibold">
          Already account?
          <Link href="/auth/login" className="hover:underline">
            click here!
          </Link>
        </h1>
      </form>
    </>
  );
};

const Reg2 = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full">
        <Input
          crossOrigin="true"
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
          crossOrigin="true"
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
          crossOrigin="true"
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
