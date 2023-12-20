"use client";

import { auth, google } from "@/utils/firebaseConfig";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const signInWithGoogle = async () => {
    try {
      console.log("Sign in successfully");
      const response = await signInWithPopup(auth, google);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <>
      <Card placeholder="any">
        <CardHeader placeholder="any" color="blue" className="px-4 py-2">
          <Typography placeholder="any">Sign in Form</Typography>
        </CardHeader>
        <CardBody placeholder="any">
          <Button
            placeholder="any"
            color="blue"
            variant="gradient"
            fullWidth
            onClick={signInWithGoogle}
          >
            Sign in with google
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
