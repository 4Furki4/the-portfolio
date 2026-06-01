"use client";
import addGuestEntry from "@/db/actions/addGuestEntry";
import { Input } from "@heroui/react";
import React from "react";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { SubmitButton } from "./Buttons/SubmitButton";
import { Session } from "next-auth";
type IntlProps = Record<"placeholder" | "sign" | "signing", string>;
export default function GuestBookForm({
  session,
  placeholder,
  sign,
  signing,
}: {
  session: Session | null;
} & IntlProps) {
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
          disabled={!session?.user}
          className="w-full"
          aria-label={placeholder}
          placeholder={placeholder}
        />
        <SubmitButton loadingText={signing} text={sign} session={session} />
      </form>
    </div>
  );
}
