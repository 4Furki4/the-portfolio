"use client";
import addGuestEntry from "@/db/actions/addGuestEntry";
import { Button, Input } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";
export default function GuestBookForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-col gap-4">
      <form
        ref={formRef}
        className="flex gap-2"
        action={async (formData) => {
          await addGuestEntry(formData);
          formRef.current?.reset();
        }}
      >
        <Input
          name="entry"
          variant="underlined"
          type="text"
          isRequired
          className="w-full"
          aria-label="Leave your message..."
          placeholder="Leave your message..."
        />
        <SubmitButton />
      </form>
      <Button
        className="hover:bg-background"
        variant="ghost"
        onPress={() =>
          signOut({
            callbackUrl: "/about#guestbook",
          })
        }
      >
        Log out
      </Button>
    </div>
  );
}

function SubmitButton() {
  const { pending }: FormStatus = useFormStatus();
  return (
    <Button isLoading={pending} type="submit">
      {pending ? "Signing..." : "Sign"}
    </Button>
  );
}
