import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
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
              <GlowingButton selectedPath={path === "/"}>Home</GlowingButton>
            </Link>
          </motion.li>

          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/projects">
              <GlowingButton selectedPath={path === "/projects"}>
                Projects
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link tabIndex={-1} className="block w-full" href="/about">
              <GlowingButton selectedPath={path === "/about"}>
                About
              </GlowingButton>
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <GlowingButton onClick={() => setParticles()}>
              {particles ? "Disable Particles" : "Enable Particles"}
            </GlowingButton>
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
            <GlowingButton selectedPath={path === "/"}>Home</GlowingButton>
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
            <GlowingButton selectedPath={path === "/projects"}>
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
            <GlowingButton selectedPath={path === "/about"}>
              About
            </GlowingButton>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <GlowingButton
            onClick={() => {
              setIsMenuOpen(false);
              setParticles();
            }}
          >
            {particles ? "Disable Particles" : "Enable Particles"}
          </GlowingButton>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
