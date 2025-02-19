import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Link } from "@heroui/react"
import Tag from '@/components/Tag'
import AnimatedCard from '@/components/AnimatedCard'
const hidden = {
    opacity: 0,
    x: -10,
    transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
    },
};

const show = {
    opacity: 1,
    x: 0,
    transition: {
        delay: 0.25,
        type: "spring",
        damping: 10,
        stiffness: 100,
    },
};
export default function TakenCourses({
    takenCourses,
    coursePage,
    title
}: {
    takenCourses: TakenCourses[],
    coursePage: string
    title: string
}) {
    return (
        <AnimatedCard
            props={{
                initial: hidden,
                viewport: { once: true, amount: 0.05 },
                whileInView: show
            }}
        >
            <CardHeader>
                <h1 className='text-center  text-fs-600 font-bold'>
                    {title}
                </h1>
            </CardHeader>
            <CardContent className='grid place-content-center md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 pt-0 sm:p-6'>
                {takenCourses.map((takenCourse) => (
                    <Card key={takenCourse.courseTitle} className='flex flex-col'>
                        <CardContent className='space-y-4 p-0'>
                            <div className="relative h-48 w-full">
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full object-cover rounded-t-lg"
                                    src={takenCourse.image}
                                    alt={takenCourse.courseTitle}
                                    sizes={
                                        '(max-width: 450px) 100vw, 450px'
                                    } />
                            </div>
                            <CardHeader className='text-fs-400 p-0 px-6'>
                                {takenCourse.courseTitle}
                            </CardHeader>
                            <div className='px-6 pb-4'>
                                <p>{takenCourse.summarize}</p>
                                <Link target='_blank' href={takenCourse.courseLink}>
                                    {coursePage}
                                </Link>
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-wrap gap-2 mt-auto px-6'>

                            {
                                takenCourse.tags.map((tag, index) => (
                                    <Tag key={index} tag={tag} />
                                ))
                            }
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </AnimatedCard>
    )
}
