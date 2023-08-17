"use client"
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

export default function Intro() {
    const theme = useContext(ThemeContext)
    return (
        <div>
            {theme}
        </div>
    )
}
