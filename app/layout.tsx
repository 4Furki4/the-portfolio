"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import BackgroundParticles from '@/components/particles/BackgroundParticles'
import Navbar from '@/components/Navbar'
import { ThemeContext } from '@/context/ThemeContext'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  return (
    <html lang="en" className=''>
      <body className={`${inter.className} w-full min-h-screen transition-colors duration-300 text-foreground bg-background relative `}>
        <ThemeContext.Provider value={theme}>
          <Navbar setTheme={setTheme} theme={theme} />
          {children}
          <div className='w-full h-screen absolute top-0 left-0'>
            <BackgroundParticles />
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  )
}
