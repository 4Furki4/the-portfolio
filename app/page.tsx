"use client"
import BackgroundParticles from '@/components/particles/BackgroundParticles'
import Image from 'next/image'

export default function Home() {

  return (
    <>
      <main className='min-h-screen'>
      </main>
      <div className='w-full h-screen absolute top-0 left-0'>
        <BackgroundParticles />
      </div>
    </>
  )
}
