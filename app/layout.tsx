import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BackgroundParticles from '@/components/particles/BackgroundParticles'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Furkan Cengiz',
  description: 'Furkan Cengiz\'s personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={`${inter.className} transition-colors duration-300 bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-50 min-h-screen relative`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
