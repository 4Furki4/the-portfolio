"use client"
import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion"
export default function GlowingButton({ props: { text, onClick, pathLength, strokeWidth, theme, className } }: { props: GlowingButtonProps }) {
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
            whileHover={{
                backgroundColor: theme === 'light' ? 'rgba(255,255,255)' : 'rgba(0,0,0)',
            }}
            whileTap={{ scale: 0.9 }}
            animate={{ x: 0, y: 0 }}
            style={{ y: -100 }}
            transition={{ duration: .3 }}
            ref={ref}
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
