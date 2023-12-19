import { getServerAuthSession } from "@/lib/auth";
import React, { Suspense } from "react";
import SigninForm from "./SigninForm";
import GuestBookForm from "./GuestBookForm";
import { GuestBookEntries } from "./GuestBookEntries";
import SignoutButton from "./Buttons/SignoutButton";
import Loading from "./Loading";
import { getTranslations } from "next-intl/server";

export default async function GuestBook() {
  const session = await getServerAuthSession();
  const t = await getTranslations("About.GuestBook");
  return (
    <section id={t("id")} className="flex flex-col gap-4">
      <GuestBookForm
        signing={t("signing")}
        sign={t("sign")}
        placeholder={t("placeholder")}
        session={session}
      />
      {session ? (
        <SignoutButton text={t("signout")} />
      ) : (
        <SigninForm
          emailDisclaimer={t("email")}
          githubSigninText={t("githubSignin")}
          googleSigninText={t("googleSignin")}
        />
      )}
      <Suspense fallback={<Loading />}>
        <GuestBookEntries session={session} />
      </Suspense>
    </section>
  );
}
