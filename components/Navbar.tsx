"use client";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";
import { useParticleContext, useParticleContextHandler } from "@/context/ParticleContext";
import { Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const particles = useParticleContext();
  const handleParticles = useParticleContextHandler();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const navItems = [
    { href: "/" as const, label: home },
    { href: "/projects" as const, label: projects },
    { href: "/about" as const, label: about },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-0 bg-background/70 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((navItem) => (
            <div key={navItem.href}>
              <Link
                tabIndex={-1}
                className="block w-full"
                href={getLocalizedHref(navItem.href, locale)}
              >
                <GlowingButton selectedPath={pathname === navItem.href}>
                  {navItem.label}
                </GlowingButton>
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              aria-expanded={isSettingsOpen}
              aria-label="Site settings"
              className="grid size-11 place-items-center rounded-md text-foreground transition-colors hover:bg-foreground/10"
              onClick={() => setIsSettingsOpen((open) => !open)}
              type="button"
            >
              <Settings size={26} />
            </button>
            {isSettingsOpen ? (
              <div className="absolute right-0 top-12 min-w-44 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
                <button
                  className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    handleParticles?.();
                    setIsSettingsOpen(false);
                  }}
                  type="button"
                >
                  {particles ? partcilesDisabled : particlesEnabled}
                </button>
                <button
                  className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    setIsSettingsOpen(false);
                    router.replace(getLocaleSwitchPath(pathname, locale));
                  }}
                  type="button"
                >
                  {locale === "en" ? "Turkce" : "English"}
                </button>
              </div>
            ) : null}
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </div>
      {isMenuOpen ? (
        <nav className="border-t border-border bg-background/95 px-4 py-3 md:hidden">
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              className="block rounded px-3 py-2 text-lg data-[active=true]:text-secondary"
              data-active={pathname === navItem.href}
              href={getLocalizedHref(navItem.href, locale)}
              onClick={() => setIsMenuOpen(false)}
            >
              {navItem.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function getLocalizedHref(href: "/" | "/projects" | "/about", locale: string) {
  if (locale !== "tr") return href;
  if (href === "/") return "/tr";
  if (href === "/about") return "/tr/hakkimda";
  return "/tr/projeler";
}

function getLocaleSwitchPath(pathname: string, locale: string) {
  if (locale === "en") {
    if (pathname === "/") return "/tr";
    if (pathname === "/about") return "/tr/hakkimda";
    if (pathname === "/projects") return "/tr/projeler";
    if (pathname.startsWith("/projects/")) {
      return pathname.replace("/projects/", "/tr/projeler/");
    }
    return `/tr${pathname}`;
  }

  if (pathname === "/tr") return "/";
  if (pathname === "/tr/hakkimda") return "/about";
  if (pathname === "/tr/projeler") return "/projects";
  if (pathname.startsWith("/tr/projeler/")) {
    return pathname.replace("/tr/projeler/", "/projects/");
  }
  return pathname.replace(/^\/tr/, "") || "/";
}
