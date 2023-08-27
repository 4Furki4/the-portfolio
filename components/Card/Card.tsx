"use client"
import React from 'react'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import { motion } from 'framer-motion'
export default function Card({ title, src, alt, description }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='bg-card/90 backdrop-blur-xs rounded-lg transition-[background-color] duration-300 z-50 p-6'>
            <CardHeader title={title} />
            <CardBody alt={alt} src={src} description={description} />
        </motion.div>
    )
}
