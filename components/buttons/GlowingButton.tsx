"use client"
import React, { useEffect, useRef } from 'react'
export default function GlowingButton({ props: { text, onClick, pathLength, strokeWidth, theme } }: { props: GlowingButtonProps }) {
    const ref = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const rects = ref.current?.querySelectorAll('rect')
        console.log(ref.current);
        const rx = getComputedStyle(ref.current as Element).borderRadius
        rects?.forEach(rect => {
            rect.setAttribute('rx', rx)
        })
    },)

    return (
        <button
            ref={ref}
            className="button glow-effect">
            {text}
            <svg className="glow-container">
                <rect pathLength="100"
                    x={50}
                    rx={16} strokeLinecap="round" className="glow-line"></rect>
                <rect
                    x={50}
                    rx={16} pathLength="100" strokeLinecap="round" className="glow-blur"></rect>
            </svg>
        </button>
    )
}
