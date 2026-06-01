import About from "@/features/About/About";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? "/about" : "/tr/hakkimda",
      title: `${t("title")} | Furkan Cengiz`,
      description: t("description"),
    },
    alternates: {
      canonical: "/about",
      languages: {
        en: "/about",
        tr: "/tr/hakkimda",
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About locale={locale} />;
}
