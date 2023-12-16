import "../globals.css";
import msClarity from "@/lib/mClarity";
import BackgroundParticles from "@/components/particles/BackgroundParticles";
import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Providers from "@/context/Providers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
export const metadata: Metadata = {
  title: {
    template: "%s | Furkan Cengiz",
    default: "Furkan Cengiz",
  },
  description: "Furkan Cengiz's personal website and portfolio",
  verification: {
    google: "6MHP_v7v_6AanMTrqnMHnFGPcHO-IcUl2l3tphvqFnM",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  metadataBase: new URL("https://www.furkancengiz.software"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Furkan Cengiz",
    "Furkan Cengiz Portfolio",
    "Furkan Cengiz Website",
    "Portfolio",
    "Furki",
    "Furki4_4",
    "Developer",
    "Software Engineer",
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Furkan Cengiz",
    description: "Furkan Cengiz's personal website and portfolio",
  },
};
const locales = ["en", "tr"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);
  return (
    <html lang="en" className={`${GeistSans.className} dark`}>
      <body
        className={`w-full transition-colors duration-300 text-foreground bg-background relative min-h-dscreen flex flex-col`}
      >
        <Providers>
          <Navbar />
          {children}
          <Analytics />
          {
            <div
              aria-hidden
              className="w-full min-h-dscreen absolute top-0 left-0"
            >
              <BackgroundParticles />
            </div>
          }
          <Footer />
        </Providers>
      </body>
      <Script id="microsoft-clarity">{msClarity}</Script>
    </html>
  );
}
