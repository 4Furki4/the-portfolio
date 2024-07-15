"use client"
import { MotionAdvancedProps, MotionProps, motion } from 'framer-motion'
import React from 'react'
import { Card } from "@/components/ui/card"
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode,
    props: MotionProps & MotionAdvancedProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
}
export default function AnimatedCard({ children, props }: Props) {
    const MotionizedCard = motion(Card)
    return (
        <MotionizedCard className={cn("block backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60", props.className)} {...props}>
            {children}
        </MotionizedCard>
    )
}
