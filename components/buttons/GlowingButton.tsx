"use client";
import React, {
  MutableRefObject,
  Ref,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  function ({ className, onClick, selectedPath, children }, ref) {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const { theme } = useTheme();
    useEffect(() => {
      const rects = localRef?.current?.querySelectorAll("rect");
      const rx = getComputedStyle(localRef?.current as Element).borderRadius;
      const containerOffset = parseInt(
        getComputedStyle(localRef.current as Element).getPropertyValue(
          "--container-offset"
        )
      );
      rects?.forEach((rect) => {
        rect.setAttribute("rx", rx);
        rect.setAttribute("x", `${containerOffset / 2}`);
        rect.setAttribute("y", `${containerOffset / 2}`);
      });
    }, [localRef]);

    return (
      <button
        onClick={onClick}
        ref={assignRefs(localRef, ref)}
        tabIndex={0}
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
);
// ref can be a function or a mutable ref object, so we need to check for both.
const assignRefs = <T extends unknown>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === "function") {
        r(node);
      } else if (r) {
        (r as MutableRefObject<T | null>).current = node;
      }
    });
  };
};
GlowingButton.displayName = "GlowingButton";

export default GlowingButton;
