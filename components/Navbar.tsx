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
  Link,
} from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";
import { useParticleContext, useParticleContextHandler } from "@/context/ParticleContext";
import { useLocale } from "next-intl";
import { usePathname, Link as NextIntlLink, useRouter } from "@/navigation";
import { Settings } from "lucide-react";
import { useParams } from "next/navigation";
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
export default function Navbar({
  about,
  home,
  particlesEnabled,
  partcilesDisabled,
  projects,
}: {
  home: string;
  projects: string;
  about: string;
  particlesEnabled: string;
  partcilesDisabled: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const particles = useParticleContext();
  const handleParticles = useParticleContextHandler();
  const locale = useLocale();
  const params = useParams();
  return (
    <NextUINavbar
      classNames={{
        toggle: ["data-[open=true]:text-danger"],
        menu: ["items-start"],
        menuItem: [
          "relative",
          "block",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:w-full",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:bg-gradient-to-r",
          "data-[active=true]:after:from-danger",
          "data-[active=true]:after:to-secondary",
          "data-[active=true]:after:bg-300%",
          "data-[active=true]:after:animate-flow-gradient",
        ],
      }}
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
            <NextIntlLink tabIndex={-1} className="block w-full" href="/">
              <GlowingButton selectedPath={pathname === "/"}>
                {home}
              </GlowingButton>
            </NextIntlLink>
          </motion.li>
        </NavbarContent>
        <NavbarContent className="hidden md:flex" justify="center">
          <motion.li variants={item}>
            <NextIntlLink
              tabIndex={-1}
              className="block w-full"
              href="/projects"
            >
              <GlowingButton selectedPath={pathname === "/projects"}>
                {projects}
              </GlowingButton>
            </NextIntlLink>
          </motion.li>
          <motion.li variants={item}>
            <NextIntlLink tabIndex={-1} className="block w-full" href="/about">
              <GlowingButton selectedPath={pathname === "/about"}>
                {about}
              </GlowingButton>
            </NextIntlLink>
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
                  onPress={handleParticles!}
                >
                  {particles ? partcilesDisabled : particlesEnabled}
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
                        params: params as any,
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
        <NavbarMenuItem data-active={pathname === "/"}>
          <Link
            size="lg"
            as={NextIntlLink}
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color={pathname === "/" ? "secondary" : "foreground"}
            className=""
            href="/"
          >
            {home}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem data-active={pathname === "/projects"}>
          <Link
            size="lg"
            as={NextIntlLink}
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color={pathname === "/projects" ? "secondary" : "foreground"}
            className=""
            href="/projects"
          >
            {projects}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem data-active={pathname === "/about"}>
          <Link
            size="lg"
            color={pathname === "/about" ? "secondary" : "foreground"}
            as={NextIntlLink}
            onPress={() => {
              setIsMenuOpen(false);
            }}
            className=""
            href="/about"
          >
            {about}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
