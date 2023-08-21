"use client"
import React from 'react'
import { motion } from 'framer-motion'
import TechIcons from '../TechIcons'
export default function Intro() {

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }
    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
    }
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className='h-full w-11/12 max-sm:mx-auto sm:w-full flex flex-col items-center justify-center text-center max-md:pt-[20%] mb-auto md:my-auto'>
            <motion.h1
                variants={item}
                className='text-4xl md:text-6xl xl:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient'>
                {"Hello World, It's Furkan!"}
            </motion.h1>
            <motion.h2
                variants={item}
                className='text-xl md:text-3xl xl:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-6'>
                {"I'm a fullstack web developer."}
            </motion.h2>
            <motion.div
                variants={item}
                className='h-[50px] grid grid-cols-3 sm:flex gap-2'>
                <TechIcons />
            </motion.div>
        </motion.div>
    )
}
