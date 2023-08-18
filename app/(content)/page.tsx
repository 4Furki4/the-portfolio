"use client"
import React from 'react'
import { motion } from 'framer-motion'
export default function Intro() {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: .3 }}
                className='text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient'>
                {"Hello World, It's Furkan!"}
            </motion.h1>
        </div>
    )
}
