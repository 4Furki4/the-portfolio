import { getServerAuthSession } from "@/lib/auth";
import React from "react";
import SigninForm from "./GuestBook/SigninForm";
import GuestBookForm from "./GuestBook/GuestBookForm";

export default async function GuestBook() {
  const session = await getServerAuthSession();
  return (
    <div>
      {session ? (
        <GuestBookForm />
      ) : (
        <div>
          <h1>Please Login!</h1>
          <SigninForm />
        </div>
      )}
    </div>
  );
}
