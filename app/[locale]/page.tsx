import React from "react";
import Home from "@/Pages/Home/Home";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Home");
  return (
    <Home
      title={t("title")}
      subtitle={t("subtitle")}
      projectsLinkText={t("projects")}
      role={t("role")}
    />
  );
}
