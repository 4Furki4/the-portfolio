"use client";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="hidden md:block">
        <Button
          className="bg-transparent"
          variant="flat"
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={32} /> : <Moon size={32} />}
        </Button>
      </div>
      <div
        className="md:hidden"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={26} /> : <Moon size={26} />}
      </div>
    </>
  );
}
