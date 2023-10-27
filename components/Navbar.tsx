import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";

export default function Navbar({
  path,
  particles,
  setParticles,
}: {
  path: string;
  particles: boolean;
  setParticles: () => void;
}) {
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
        className="w-full h-full"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarContent className="w-full hidden md:flex" justify="center">
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/">
              <GlowingButton text="Home" selectedPath={path === "/"} />
            </Link>
          </motion.li>

          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/projects">
              <GlowingButton
                text="Projects"
                selectedPath={path === "/projects"}
              />
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/about">
              <GlowingButton text="About" selectedPath={path === "/about"} />
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <GlowingButton
              text={particles ? "Disable Particles" : "Enable Particles"}
              onClick={() => setParticles()}
            />
          </motion.li>
          <motion.li variants={item}>
            <ThemeButton />
          </motion.li>
        </NavbarContent>
      </motion.div>
      <div className="md:hidden">
        <ThemeButton />
      </div>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="block w-full"
            href="/"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <GlowingButton text="Home" selectedPath={path === "/"} />
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
            <GlowingButton
              text="Projects"
              selectedPath={path === "/projects"}
            />
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
            <GlowingButton text="About" selectedPath={path === "/about"} />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <GlowingButton
            text={particles ? "Disable Particles" : "Enable Particles"}
            onClick={() => {
              setIsMenuOpen(false);
              setParticles();
            }}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
