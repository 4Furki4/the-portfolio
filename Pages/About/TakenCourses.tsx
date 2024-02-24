import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import { takenCourses } from '@/db/static/takenCourses'
import Image from 'next/image'
import { Link } from '@nextui-org/react'
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
export default function TakenCourses() {
    return (
        <AnimatedCard
            props={{
                initial: hidden,
                viewport: { once: true, amount: 0.25 },
                whileInView: show
            }}
        >
            <CardHeader>
                <h1 className='text-center text-fs-600 font-bold'>Taken Courses</h1>
            </CardHeader>
            <CardContent className='grid place-content-center md:grid-cols-2 gap-4 p-2 pt-0 sm:p-6'>
                {takenCourses.map((takenCourse) => (
                    <Card key={takenCourse.courseTitle} className='flex flex-col'>
                        <CardHeader className='text-center text-fs-400 md:min-h-32'>
                            {takenCourse.courseTitle}
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <Image className='text-center' src={takenCourse.image} alt={takenCourse.courseTitle} width={450} height={400} sizes={
                                '(max-width: 450px) 100vw, 450px'
                            } />
                            <div className='space-y-2'>
                                <p>{takenCourse.summarize}</p>
                                <Link target='_blank' href={takenCourse.courseLink}>Course Page</Link>
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-wrap gap-2 mt-auto'>

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
