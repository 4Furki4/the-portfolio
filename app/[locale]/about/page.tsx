import About from "@/features/About/About";
import { setRequestLocale } from "next-intl/server";
import React from "react";
import { getAboutPage } from "@/lib/directus/data";
import type { PortfolioLocale } from "@/lib/directus/types";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getAboutPage(locale as PortfolioLocale);
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? "/about" : "/tr/hakkimda",
      title: `${content.seoTitle} | Furkan Cengiz`,
      description: content.seoDescription,
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
  const content = await getAboutPage(locale as PortfolioLocale);
  return <About content={content} locale={locale} />;
}
