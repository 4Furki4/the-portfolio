"use client"
import { MotionProps } from 'framer-motion'
import React from 'react'
import { Card } from "@/components/ui/card"
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode,
    props: MotionProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
}
export default function AnimatedCard({ children, props }: Props) {
    const cardProps = { ...props };
    delete cardProps.animate;
    delete cardProps.initial;
    delete cardProps.transition;
    delete cardProps.variants;
    delete cardProps.viewport;
    delete cardProps.whileInView;

    return (
        <Card className={cn("block backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60", props.className)} {...cardProps}>
            {children}
        </Card>
    )
}
