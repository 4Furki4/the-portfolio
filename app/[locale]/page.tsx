import React from "react";
import { GeistSans } from "geist/font";
import Home from "@/Pages/Home/Home";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Home");
  const title = t("title");
  const subtitle = t("subtitle");
  return (
    <Home
      className={`${GeistSans.className}`}
      title={title}
      subtitle={subtitle}
    />
  );
}
