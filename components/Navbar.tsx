"use client"
import React, { useEffect } from 'react'
import GlowingButton from './buttons/GlowingButton'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MenuButton from './buttons/MenuButton'
import ThemeButton from './buttons/ThemeButton'
import { Button } from './ui/button'
export default function Navbar({ setTheme, theme }: {
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
    theme: 'light' | 'dark'
}) {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <header className='shadow-lg'>
            <nav className='p-2 relative'>
                <ul className='flex flex-col md:flex-row justify-center md:gap-12'>
                    <li className='md:hidden ml-auto'>
                        <MenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
                    </li>
                    <div className={`flex ${isOpen ? 'flex-col md:flex-row' : 'max-md:hidden'} justify-center`}>
                        <li>
                            <Link href='/'>
                                <GlowingButton props={{
                                    text: 'Home',
                                    theme
                                }}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                <GlowingButton props={{
                                    text: 'About',
                                    theme
                                }}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='/projects'>
                                <GlowingButton props={{
                                    text: 'Projects',
                                    theme
                                }}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='/contact'>
                                <GlowingButton props={{
                                    text: 'Contact',
                                    theme
                                }}
                                />
                            </Link>
                        </li>
                    </div>
                    <li className='inline-block max-w-max absolute max-md:top-2 left-2 md:right-2 z-50'>
                        <ThemeButton setTheme={setTheme} theme={theme} />
                    </li>
                </ul>
            </nav>
        </header>
    )
}
