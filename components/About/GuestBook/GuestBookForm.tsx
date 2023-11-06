"use client";
import addGuestEntry from "@/db/actions/addGuestEntry";
import { Button, Input } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";
export default function GuestBookForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { pending }: FormStatus = useFormStatus();
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
          ref={inputRef}
          name="entry"
          variant="underlined"
          type="text"
          isRequired
          isDisabled={pending}
          className="w-full"
          aria-label="Leave your message..."
          placeholder="Leave your message.."
        />
        <Button isLoading={pending} type="submit">
          Submit
        </Button>
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
        Sign out
      </Button>
    </div>
  );
}
