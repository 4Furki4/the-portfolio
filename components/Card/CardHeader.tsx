import React from 'react'

export default function CardHeader({ title }: { title: string }) {
    return (
        <h2 className='z-50 text-lg md:text-xl lg:text-2xl font-bold pb-4 text-center'>
            {title}
        </h2>
    )
}
