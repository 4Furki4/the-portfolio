"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { drawContributions } from "github-contributions-canvas";

const hidden = {
  opacity: 0,
  x: -10,
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 100,
  },
};

const show = {
  opacity: 1,
  x: 0,
  transition: {
    delay: 0.25,
    type: "spring",
    damping: 10,
    stiffness: 100,
  },
};
export default function GitHubTable({
  githubTableData,
  title,
}: {
  githubTableData: any;
  title: string;
}) {
  const { theme } = useTheme();
  const AnimatedCard = useMemo(() => motion(Card), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    drawContributions(canvasRef.current!, {
      data: githubTableData,
      username: "4Furki4",
      themeName: theme === "dark" ? "githubDark" : "classic",
      footerText:
        "Thanks to @sallar & his friends - github-contributions.vercel.app | https://github.com/sallar/github-contributions-canvas",
    });
  }, [githubTableData, theme]);
  return (
    <AnimatedCard
      initial={hidden}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={show}
      className="block backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60"
    >
      <CardHeader>
        <CardTitle className="text-fs-600 font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          aria-label="Github Contribution Table"
          width="845"
          height="603"
          className="w-full h-auto rounded-md shadow-md"
          ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
        ></canvas>
      </CardContent>
    </AnimatedCard>
  );
}
