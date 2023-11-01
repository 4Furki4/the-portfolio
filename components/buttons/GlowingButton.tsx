"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
export default function GlowingButton({
  className,
  onClick,
  selectedPath,
  children,
}: GlowingButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  useEffect(() => {
    const rects = ref.current?.querySelectorAll("rect");
    const rx = getComputedStyle(ref.current as Element).borderRadius;
    const containerOffset = parseInt(
      getComputedStyle(ref.current as Element).getPropertyValue(
        "--container-offset"
      )
    );
    rects?.forEach((rect) => {
      rect.setAttribute("rx", rx);
      rect.setAttribute("x", `${containerOffset / 2}`);
      rect.setAttribute("y", `${containerOffset / 2}`);
    });
  }, [ref]);

  return (
    <button
      onClick={onClick}
      ref={ref}
      data-glow-animation={selectedPath}
      data-selected={selectedPath}
      className={cn(
        `button glow-effect ${theme ?? "dark"} text-sm z-50`,
        className
      )}
    >
      {children}
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
