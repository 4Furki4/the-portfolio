"use client";
import { deleteMessage } from "@/db/actions/deleteEntry";
import { Trash2 } from "lucide-react";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";

export function DeleteButton({ id }: { id: string }) {
  return (
    <form className="ml-auto" action={async () => await deleteMessage(id)}>
      <TrashButton />
    </form>
  );
}

function TrashButton() {
  const { pending }: FormStatus = useFormStatus();
  return (
    <button
      style={{ opacity: pending ? 0.75 : 1 }}
      disabled={pending}
      type="submit"
    >
      <Trash2 size={20} />
    </button>
  );
}
