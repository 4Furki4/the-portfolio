import React from "react";
import { Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="w-full p-2 z-50 flex gap-8 justify-center items-center bg-background/60 backdrop-blur-xs shadow-foreground shadow-sm transition-shadow-bg duration-300">
      <Link
        target="_blank"
        href={"https://www.linkedin.com/in/4furkancengiz4/"}
        className="hover:bg-gray-100 dark:hover:bg-black rounded-full p-4"
      >
        <Linkedin />
      </Link>
      <Link
        target="_blank"
        href={"/Furkan Cengiz Resume.pdf"}
        className="hover:bg-gray-100 dark:hover:bg-black rounded-full p-4"
      >
        <span className="text-fs-300 flex items-center gap-1">
          CV <Download size={18} />
        </span>
      </Link>
      <Link
        className="hover:bg-gray-100 dark:hover:bg-black rounded-full p-4"
        target="_blank"
        href={"https://github.com/4furki4"}
      >
        <Github />
      </Link>
    </div>
  );
}
