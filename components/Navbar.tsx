"use client"
import React from 'react'
import ThemeButton from './buttons/ThemeButton'
import GlowingButton from './buttons/GlowingButton'
export default function Navbar() {
    return (
        <nav className='flex items-center'>
            <ThemeButton />
            <GlowingButton props={{
                text: 'Projects',
                onClick: () => { },
                theme: 'dark'
            }} />
        </nav>
    )
}
