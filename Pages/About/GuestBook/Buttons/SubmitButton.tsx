import { Button } from "@heroui/react";
import { Session } from "next-auth";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";

export function SubmitButton({
  session,
  loadingText,
  text,
}: {
  session: Session | null;
  loadingText: string;
  text: string;
}) {
  const { pending }: FormStatus = useFormStatus();
  return (
    <Button isDisabled={!session?.user} isLoading={pending} type="submit">
      {pending ? loadingText : text}
    </Button>
  );
}
