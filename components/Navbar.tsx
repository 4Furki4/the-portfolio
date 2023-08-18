"use client"
import React, { useContext } from 'react'
import ThemeButton from './buttons/ThemeButton'
import GlowingButton from './buttons/GlowingButton'
import { ThemeContext } from '@/context/ThemeContext'
import Link from 'next/link'
export default function Navbar({ setTheme, theme }: {
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
    theme: 'light' | 'dark'
}) {
    return (
        <nav className='flex items-center justify-center gap-16 p-4 dark:bg-slate-950 bg-slate-200 transition-colors duration-300'>
            <Link href='/' className='ml-auto'>
                <GlowingButton props={{
                    text: 'Home',
                    onClick: () => { },
                    theme: theme
                }} />
            </Link>
            <Link href='/projects'>
                <GlowingButton props={{
                    text: 'Projects',
                    onClick: () => { },
                    theme: theme
                }} />
            </Link>
            <Link href='/about me' className='mr-auto'>
                <GlowingButton props={{
                    text: 'About Me',
                    onClick: () => { },
                    theme: theme
                }} />
            </Link>
            <div className='mr-4 z-50'>
                <ThemeButton setTheme={setTheme} theme={theme} />
            </div>
        </nav>
    )
}
