import React from 'react'

export default function CardDescription({ description }: CardDescriptionProps) {
    return (
        <p className='text-xs sm:text-lg mt-8'>
            {description}
        </p>
    )
}
