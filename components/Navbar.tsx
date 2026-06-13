"use client";
import React from "react";
import ThemeButton from "./buttons/ThemeButton";
import { useParticleContext, useParticleContextHandler } from "@/context/ParticleContext";
import { Languages, Menu, Settings, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleSwitchPath,
  getLocalizedHref,
  isActivePath,
  type LocalizedRootHref,
} from "@/lib/localizedPath";
import { cn } from "@/lib/utils";

export default function Navbar({
  about,
  home,
  particlesEnabled,
  partcilesDisabled,
  projects,
  locale,
}: {
  home: string;
  projects: string;
  about: string;
  particlesEnabled: string;
  partcilesDisabled: string;
  locale: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const particles = useParticleContext();
  const handleParticles = useParticleContextHandler();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsSettingsOpen(false);
  }, [pathname]);
  const navItems = [
    { href: "/projects" as LocalizedRootHref, label: projects },
    { href: "/about" as LocalizedRootHref, label: about },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/72 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          href={getLocalizedHref("/", locale)}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-100 transition-colors group-hover:border-cyan-300/70">
            FC
          </span>
          <span className="hidden text-sm font-semibold text-foreground/92 sm:block">
            Furkan Cengiz
          </span>
        </Link>
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="col-start-3 grid size-10 place-items-center justify-self-end rounded-lg border border-white/10 bg-white/[0.045] text-foreground md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className="hidden justify-center md:flex">
          <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.035] p-1">
            {[{ href: "/" as LocalizedRootHref, label: home }, ...navItems].map(
              (navItem) => (
                <Link
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                    isActivePath(pathname, navItem.href, locale) &&
                      "bg-white/10 text-foreground shadow-sm",
                  )}
                  href={getLocalizedHref(navItem.href, locale)}
                  key={navItem.href}
                >
                  {navItem.label}
                </Link>
              ),
            )}
          </div>
        </nav>
        <div className="hidden items-center justify-end gap-2 md:flex">
          <div className="relative">
            <button
              aria-expanded={isSettingsOpen}
              aria-label="Site settings"
              className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.045] text-foreground transition-colors hover:border-cyan-300/50 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              onClick={() => setIsSettingsOpen((open) => !open)}
              type="button"
            >
              <Settings size={19} />
            </button>
            {isSettingsOpen ? (
              <div className="absolute right-0 top-12 grid min-w-56 gap-1 rounded-lg border border-white/10 bg-popover/95 p-1.5 text-popover-foreground shadow-2xl backdrop-blur-xl">
                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
                  onClick={() => {
                    handleParticles?.();
                    setIsSettingsOpen(false);
                  }}
                  type="button"
                >
                  <Sparkles aria-hidden size={16} />
                  {particles ? partcilesDisabled : particlesEnabled}
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
                  onClick={() => {
                    setIsSettingsOpen(false);
                    const nextLocale = locale === "en" ? "tr" : "en";
                    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; samesite=lax`;
                    window.location.assign(
                      getLocaleSwitchPath(window.location.pathname)
                    );
                  }}
                  type="button"
                >
                  <Languages aria-hidden size={16} />
                  {locale === "en" ? "Türkçe" : "English"}
                </button>
              </div>
            ) : null}
          </div>
          <ThemeButton />
        </div>
      </div>
      {isMenuOpen ? (
        <nav className="grid gap-2 border-t border-white/10 bg-background/95 px-4 py-4 shadow-2xl backdrop-blur-xl md:hidden">
          {[{ href: "/" as LocalizedRootHref, label: home }, ...navItems].map((navItem) => (
            <Link
              key={navItem.href}
              className={cn(
                "rounded-lg border border-transparent px-3 py-2 text-base font-semibold text-muted-foreground",
                isActivePath(pathname, navItem.href, locale) &&
                  "border-white/10 bg-white/[0.045] text-foreground",
              )}
              href={getLocalizedHref(navItem.href, locale)}
              onClick={() => setIsMenuOpen(false)}
            >
              {navItem.label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-[1fr_auto] gap-2 border-t border-white/10 pt-3">
            <button
              className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-muted-foreground"
              onClick={() => {
                handleParticles?.();
                setIsMenuOpen(false);
              }}
              type="button"
            >
              <Sparkles aria-hidden size={16} />
              {particles ? partcilesDisabled : particlesEnabled}
            </button>
            <ThemeButton />
            <button
              className="col-span-2 flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-muted-foreground"
              onClick={() => {
                const nextLocale = locale === "en" ? "tr" : "en";
                document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; samesite=lax`;
                window.location.assign(getLocaleSwitchPath(window.location.pathname));
              }}
              type="button"
            >
              <Languages aria-hidden size={16} />
              {locale === "en" ? "Türkçe" : "English"}
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
