"use client";
import React from "react";
import GlowingButton from "./buttons/GlowingButton";
import { motion } from "framer-motion";
import Link from "next/link";
import MenuButton from "./buttons/MenuButton";
import ThemeButton from "./buttons/ThemeButton";
export default function Navbar({
  setTheme,
  theme,
  setParticles,
  particles,
  path,
}: {
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: "light" | "dark";
  setParticles: React.Dispatch<React.SetStateAction<boolean>>;
  particles: boolean;
  path: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
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
  return (
    <motion.header className="bg-background md:bg-background/60 backdrop-blur-xs shadow-accent shadow-sm overflow-hidden fixed top-0 w-full z-[99] transition-shadow-bg duration-300">
      <nav className="p-2">
        <motion.ul
          variants={container}
          initial="hide"
          animate="show"
          className="flex flex-col md:flex-row justify-center md:gap-12"
        >
          <motion.li variants={item} className="md:hidden ml-auto">
            <MenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
          </motion.li>
          <motion.div
            variants={container}
            initial="hide"
            animate={isOpen ? "show" : "hide"}
            transition={{ duration: 0.3 }}
            className={`flex md:hidden max-md:mt-4 flex-col ${
              isOpen ? "md:flex-row text-center" : "hidden"
            } justify-center gap-2 z-50`}
          >
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/">
                <GlowingButton
                  props={{
                    text: "Home",
                    theme,
                    selectedPath: path === "/",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/projects">
                <GlowingButton
                  props={{
                    text: "Projects",
                    theme,
                    selectedPath: path === "/projects",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg  dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/about">
                <GlowingButton
                  props={{
                    text: "About",
                    theme,
                    selectedPath: path === "/about",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="md:ml-auto max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <GlowingButton
                props={{
                  text: particles ? "Disable Particles" : "Enable Particles",
                  onClick: () => setParticles(!particles),
                  theme,
                }}
              />
            </motion.li>
          </motion.div>
          <motion.div
            variants={container}
            initial="hide"
            animate="show"
            className={`hidden md:flex md:items-center md:flex-row justify-center gap-2 z-50`}
          >
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/">
                <GlowingButton
                  props={{
                    text: "Home",
                    theme,
                    selectedPath: path === "/",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/projects">
                <GlowingButton
                  props={{
                    text: "Projects",
                    theme,
                    selectedPath: path === "/projects",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="max-md:backdrop-blur-md max-md:shadow-lg  dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <Link className="block w-full" href="/about">
                <GlowingButton
                  props={{
                    text: "About",
                    theme,
                    selectedPath: path === "/about",
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              variants={item}
              className="md:ml-auto max-md:backdrop-blur-md max-md:shadow-lg dark:max-md:bg-white/10 py-1 rounded-lg"
            >
              <GlowingButton
                props={{
                  text: particles ? "Disable Particles" : "Enable Particles",
                  onClick: () => setParticles(!particles),
                  theme,
                }}
              />
            </motion.li>
          </motion.div>
          <motion.li
            variants={{
              hide: {
                y: -100,
                opacity: 0,
              },
              show: {
                y: 0,
                opacity: 1,
              },
            }}
            className="inline-block max-w-max absolute max-md:top-2 md:left-2 z-50"
          >
            <ThemeButton setTheme={setTheme} theme={theme} />
          </motion.li>
        </motion.ul>
      </nav>
    </motion.header>
  );
}
