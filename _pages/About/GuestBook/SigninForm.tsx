"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@heroui/react";
import GoogleSvg from "@/public/svgs/google.svg";
import Image from "next/image";
import { Github } from "lucide-react";
export default function SigninForm({
  googleSigninText,
  githubSigninText,
  emailDisclaimer,
}: {
  googleSigninText: string;
  githubSigninText: string;
  emailDisclaimer: string;
}) {
  return (
    <div className="grid grid-cols-2 grid-row-3 md:grid-rows-2 gap-2 sm:flex-row w-full">
      <Button
        className="w-full flex items-center col-span-2 md:col-span-1 row-span-1"
        variant="ghost"
        onClick={() => signIn("google", { callbackUrl: "/about#guestbook" })}
      >
        {googleSigninText}{" "}
        <Image className="h-6" src={GoogleSvg} alt="Google" />
      </Button>
      <Button
        className="w-full col-span-2 md:col-span-1 row-span-2 md:row-span-1"
        variant="ghost"
        onClick={() => signIn("github", { callbackUrl: "/about#guestbook" })}
      >
        {githubSigninText} <Github className="h-6" />
      </Button>
      <p className="text-fs-100 w-full col-span-2 row-span-3 md:row-span-2">
        {emailDisclaimer}
      </p>
    </div>
  );
}
