import React from "react";
import Home from "@/features/Home/Home";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  return (
    <Home
      title={t("title")}
      subtitle={t("subtitle")}
      projectsLinkText={t("projects")}
      role={t("role")}
    />
  );
}
