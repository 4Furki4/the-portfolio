"use client"
import React from 'react'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import { motion } from 'framer-motion'
import CardFooter from './CardFooter'
export default function Card({ title, images, description, demoLink, repoLink }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='dark:bg-white/10 dark:shadow-none shadow-lg drop-shadow-lg bg-opacity-10 backdrop-blur-xs rounded-lg transition-[background-color] duration-300 z-50 p-6'>
            <CardHeader title={title} />
            <CardBody description={description} images={images} />
            <CardFooter demoLink={demoLink} repoLink={repoLink} />
        </motion.div>
    )
}
