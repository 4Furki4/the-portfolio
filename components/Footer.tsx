import React from "react";
import { Download, GitPullRequest, Link2, Mail } from "lucide-react";
import Link from "next/link";
import { getLocalizedHref } from "@/lib/localizedPath";

export default function Footer({ locale }: { locale: string }) {
  const links = [
    { href: getLocalizedHref("/projects", locale), label: locale === "tr" ? "Projeler" : "Projects" },
    { href: getLocalizedHref("/about", locale), label: locale === "tr" ? "Hakkımda" : "About" },
    { href: "/CV.pdf", label: "CV", icon: <Download aria-hidden size={16} /> },
  ];

  return (
    <footer className="relative z-20 border-t border-white/10 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold text-foreground">Furkan Cengiz</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {locale === "tr"
              ? "Modern web arayüzleri, üretim odaklı uygulamalar ve açık kaynak projeler."
              : "Modern web interfaces, production-minded apps, and open-source projects."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-teal-300/50 hover:text-teal-100"
              href={link.href}
              key={link.href}
              target={link.href === "/CV.pdf" ? "_blank" : undefined}
            >
              {link.label}
              {link.icon}
            </Link>
          ))}
          <Link
            aria-label="LinkedIn"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-muted-foreground transition-colors hover:border-teal-300/50 hover:text-teal-100"
            href="https://www.linkedin.com/in/4furkancengiz4/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Link2 aria-hidden size={18} />
          </Link>
          <Link
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-muted-foreground transition-colors hover:border-teal-300/50 hover:text-teal-100"
            href="https://github.com/4furki4"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitPullRequest aria-hidden size={18} />
          </Link>
          <Link
            aria-label="Email"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-muted-foreground transition-colors hover:border-teal-300/50 hover:text-teal-100"
            href="mailto:muhammedcengiz1@gmail.com"
          >
            <Mail aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
