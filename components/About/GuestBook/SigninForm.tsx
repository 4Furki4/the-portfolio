"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import GoogleSvg from "@/public/svgs/google.svg";
import Image from "next/image";
import { Github } from "lucide-react";
export default function SigninForm() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row w-full">
      <Button
        className="w-full flex items-center"
        variant="ghost"
        onClick={() => signIn("google", { callbackUrl: "/about#guestbook" })}
      >
        Sign in with Google{" "}
        <Image className="h-6" src={GoogleSvg} alt="Google" />
      </Button>
      <Button
        className="w-full"
        variant="ghost"
        onClick={() => signIn("github", { callbackUrl: "/about#guestbook" })}
      >
        Sign in with GitHub <Github className="h-6" />
      </Button>
    </div>
  );
}
