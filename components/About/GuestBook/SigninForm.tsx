"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
export default function SigninForm() {
  return (
    <div className="flex flex-col">
      <Button variant="ghost" onClick={() => signIn("google")}>
        Sign in with Google
      </Button>
      <Button variant="ghost" onClick={() => signIn("github")}>
        Sign in with GitHub
      </Button>
    </div>
  );
}
