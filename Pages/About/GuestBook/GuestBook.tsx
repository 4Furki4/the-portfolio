import { getServerAuthSession } from "@/lib/auth";
import React, { Suspense } from "react";
import SigninForm from "./SigninForm";
import GuestBookForm from "./GuestBookForm";
import { GuestBookEntries } from "./GuestBookEntries";
import SignoutButton from "./Buttons/SignoutButton";

export default async function GuestBook() {
  const session = await getServerAuthSession();
  return (
    <section id="guestbook" className="flex flex-col gap-4">
      <GuestBookForm session={session} />
      {session ? <SignoutButton /> : <SigninForm />}
      <Suspense>
        <GuestBookEntries session={session} />
      </Suspense>
    </section>
  );
}
