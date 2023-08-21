"use client"
import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion"
export default function GlowingButton({ props: { text, onClick, theme, className, selectedPath } }: { props: GlowingButtonProps }) {
    const ref = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const rects = ref.current?.querySelectorAll('rect')
        const rx = getComputedStyle(ref.current as Element).borderRadius
        rects?.forEach(rect => {
            rect.setAttribute('rx', rx)
        })
    },)

    return (
        <motion.button
            onClick={onClick}
            ref={ref}
            data-glow-animation={selectedPath}
            data-selected={selectedPath}
            className={`button glow-effect ${theme} text-sm ${className} z-50`}>
            {text}
            <svg className="glow-container">
                <rect pathLength="100"
                    x={50}
                    rx={16} strokeLinecap="round" className="glow-line"></rect>
                <rect
                    x={50}
                    rx={16} pathLength="100" strokeLinecap="round" className="glow-blur"></rect>
            </svg>
        </motion.button>
    )
}
