import React from 'react'

export default function CardHeader({ title }: { title: string }) {
    return (
        <h2 className='z-50 text-lg lg:text-2xl font-bold'>
            {title}
        </h2>
    )
}
