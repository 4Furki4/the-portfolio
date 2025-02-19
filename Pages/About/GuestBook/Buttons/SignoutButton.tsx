"use client";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignoutButton({ text }: { text: string }) {
  return (
    <Button
      className="hover:bg-background"
      variant="ghost"
      onPress={() =>
        signOut({
          callbackUrl: "/about#guestbook",
        })
      }
    >
      {text}
    </Button>
  );
}
