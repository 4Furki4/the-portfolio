"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
export default function GlowingButton({
  text,
  bgColor,
  className,
  onClick,
  selectedPath,
}: GlowingButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  useEffect(() => {
    const rects = ref.current?.querySelectorAll("rect");
    const rx = getComputedStyle(ref.current as Element).borderRadius;
    rects?.forEach((rect) => {
      rect.setAttribute("rx", rx);
    });
  });

  return (
    <button
      onClick={onClick}
      ref={ref}
      data-glow-animation={selectedPath}
      data-selected={selectedPath}
      className={cn(`button glow-effect ${theme} text-sm z-50`, className)}
    >
      {text}
      <svg tabIndex={-1} className="glow-container">
        <rect
          tabIndex={-1}
          pathLength="100"
          x={50}
          rx={16}
          strokeLinecap="round"
          className="glow-line"
        ></rect>
        <rect
          tabIndex={-1}
          x={50}
          rx={16}
          pathLength="100"
          strokeLinecap="round"
          className="glow-blur"
        ></rect>
      </svg>
    </button>
  );
}
