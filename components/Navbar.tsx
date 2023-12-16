"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";
import { useParticleContext } from "@/context/ParticleContext";
import { useLocale } from "next-intl";
import { usePathname, Link as NextIntlLink, useRouter } from "@/navigation";
import projects from "@/db/static/projects";
import { useParams } from "next/navigation";
import { Settings } from "lucide-react";

export default function Navbar() {
  const container = {
    hide: {
      y: -100,
      opacity: 0,
      transition: {
        staggerDirection: -1,
      },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        staggerDirection: 1,
      },
    },
  };
  const item = {
    hide: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { particles, handleParticles } = useParticleContext();
  const locale = useLocale();
  const params = useParams();
  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="backdrop-saturate-150 bg-background/70 border-0"
      isBlurred
    >
      <motion.div
        variants={container}
        initial="hide"
        animate="show"
        className="w-full h-full flex justify-between items-center"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarContent justify="start" className="hidden md:flex">
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/">
              <GlowingButton selectedPath={pathname === "/"}>
                Home
              </GlowingButton>
            </Link>
          </motion.li>
        </NavbarContent>
        <NavbarContent className="hidden md:flex" justify="center">
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/projects">
              <GlowingButton selectedPath={pathname === "/projects"}>
                Projects
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/about">
              <GlowingButton selectedPath={pathname === "/about"}>
                About
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link
              tabIndex={-1}
              className="block w-full"
              href="/about#guestbook"
            >
              <GlowingButton selectedPath={pathname === "/about#guestbook"}>
                Guestbook
              </GlowingButton>
            </Link>
          </motion.li>
        </NavbarContent>
        <NavbarContent className="gap-2">
          <motion.li variants={item} className="ml-auto">
            <Dropdown>
              <DropdownTrigger>
                <Button className="min-w-max max-w-max p-4" variant="light">
                  <Settings size={26} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="site settings">
                <DropdownItem
                  key="particles"
                  onPress={() => handleParticles(!particles)}
                >
                  {particles ? "Disable Particles" : "Enable Particles"}
                </DropdownItem>
                <DropdownItem
                  key="particles"
                  onPress={() => {
                    router.replace(
                      {
                        pathname,
                        // TypeScript will validate that only known `params` are used in combination
                        // with a given `pathname`. Since the two will always match for the current
                        // route, we can skip runtime checks.
                        params: { ...(params as any) },
                      },
                      { locale: locale === "en" ? "tr" : "en" }
                    );
                  }}
                >
                  {locale === "en" ? "Türkçe" : "English"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </motion.li>
          <motion.li variants={item}>
            <ThemeButton />
          </motion.li>
        </NavbarContent>
      </motion.div>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/"}>Home</GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/projects"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/projects"}>
              Projects
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/about"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/about"}>
              About
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/about#guestbook"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton selectedPath={pathname === "/about#guestbook"}>
              Guestbook
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
