import { Button } from "@nextui-org/react";
//@ts-ignore Warning: useFormStatus is now in canary. Remove the experimental_ prefix. The prefixed alias will be removed in an upcoming release.
import { FormStatus, useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending }: FormStatus = useFormStatus();
  return (
    <Button isLoading={pending} type="submit">
      {pending ? "Signing..." : "Sign"}
    </Button>
  );
}
