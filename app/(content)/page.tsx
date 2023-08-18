"use client"
import React from 'react'
import { motion } from 'framer-motion'
import TechIcons from '@/components/TechIcons'
export default function Intro() {
    return (
        <div className='h-screen w-3/4 max-sm:mx-auto sm:w-full flex flex-col items-center justify-center text-center'>
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: .3, delay: .3 }}
                className='text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient'>
                {"Hello World, It's Furkan!"}
            </motion.h1>
            <motion.h2
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: .3, delay: .6 }}
                className='text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient mb-20'>
                {"I'm a fullstack web developer."}
            </motion.h2>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .3, delay: .9 }}
                className='h-[50px] grid grid-cols-3 sm:flex gap-2'>
                <TechIcons />
            </motion.div>
        </div>
    )
}
