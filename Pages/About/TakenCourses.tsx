import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import { takenCourses } from '@/db/static/takenCourses'
import Image from 'next/image'
import { Link } from '@nextui-org/react'
export default function TakenCourses() {
    return (
        <Card>
            <CardHeader>
                <h1 className='text-center text-fs-600 font-bold'>Taken Courses</h1>
            </CardHeader>
            <CardContent className='grid place-content-center md:grid-cols-2 gap-4'>
                {takenCourses.map((takenCourse) => (
                    <Card key={takenCourse.courseTitle} className='max-w-md'>
                        <CardHeader className='text-center text-fs-400'>
                            {takenCourse.courseTitle}
                        </CardHeader>
                        <CardContent>
                            <Image className='text-center' src={takenCourse.image} alt={takenCourse.courseTitle} width={450} height={400} sizes={
                                '(max-width: 450px) 100vw, 450px'
                            } />
                            <p>{takenCourse.summarize}</p>
                            <Link target='_blank' href={takenCourse.courseLink}>Course Page</Link>
                        </CardContent>
                        <CardFooter className='flex flex-wrap gap-2'>
                            {takenCourse.tags.map((tag, index) => (
                                <p key={index} className='text-fs-200 bg-foreground-foreground rounded-full px-3 py-1'>
                                    {tag}
                                </p>
                            ))
                            }
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
