import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import GlowingButton from "./buttons/GlowingButton";
import ThemeButton from "./buttons/ThemeButton";

export default function Navbar2({
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
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="bg-background md:bg-background/60 shadow-accent z-[99] transition-shadow-bg duration-300"
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
          <motion.span variants={item}>
            <NavbarItem>
              <Link className="block w-full" href="/">
                <GlowingButton
                  props={{
                    text: "Home",

                    selectedPath: path === "/",
                  }}
                />
              </Link>
            </NavbarItem>
          </motion.span>
          <motion.span variants={item}>
            <NavbarItem>
              <Link className="block w-full" href="/projects">
                <GlowingButton
                  props={{
                    text: "Projects",
                    selectedPath: path === "/projects",
                  }}
                />
              </Link>
            </NavbarItem>
          </motion.span>
          <motion.span variants={item}>
            <NavbarItem>
              <Link className="block w-full" href="/about">
                <GlowingButton
                  props={{
                    text: "About",

                    selectedPath: path === "/about",
                  }}
                />
              </Link>
            </NavbarItem>
          </motion.span>
          <motion.span variants={item}>
            <NavbarItem>
              <GlowingButton
                props={{
                  text: particles ? "Disable Particles" : "Enable Particles",
                  onClick: () => setParticles(),
                }}
              />
            </NavbarItem>
          </motion.span>
          <motion.span variants={item}>
            <NavbarItem className="cursor-pointer">
              <ThemeButton />
            </NavbarItem>
          </motion.span>
        </NavbarContent>
      </motion.div>
      <NavbarMenu style={{ zIndex: "100" }}>
        <NavbarMenuItem>
          <Link className="block w-full" href="/">
            <GlowingButton
              props={{
                text: "Home",

                selectedPath: path === "/",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="block w-full" href="/projects">
            <GlowingButton
              props={{
                text: "Projects",

                selectedPath: path === "/projects",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="block w-full" href="/about">
            <GlowingButton
              props={{
                text: "About",

                selectedPath: path === "/about",
              }}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <GlowingButton
            props={{
              text: particles ? "Disable Particles" : "Enable Particles",
              onClick: () => {
                setIsMenuOpen(false);
                setParticles();
              },
            }}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
