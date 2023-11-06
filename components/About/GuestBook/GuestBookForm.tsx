"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function GuestBookForm() {
  return (
    <div>
      <form action=""></form>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}
