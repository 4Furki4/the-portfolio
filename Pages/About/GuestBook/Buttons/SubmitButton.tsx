import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";

export function SubmitButton({ session }: { session: Session | null }) {
  const { pending }: FormStatus = useFormStatus();
  return (
    <Button isDisabled={!session?.user} isLoading={pending} type="submit">
      {pending ? "Signing..." : "Sign"}
    </Button>
  );
}
