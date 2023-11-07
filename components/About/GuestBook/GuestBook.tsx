import { getServerAuthSession } from "@/lib/auth";
import React, { Suspense } from "react";
import SigninForm from "./SigninForm";
import GuestBookForm from "./GuestBookForm";
import { GuestBookEntries } from "./GuestBookEntries";

export default async function GuestBook() {
  const session = await getServerAuthSession();
  return (
    <section className="flex flex-col gap-4">
      {session ? <GuestBookForm /> : <SigninForm />}
      <Suspense>
        <GuestBookEntries session={session} />
      </Suspense>
    </section>
  );
}
