import Image from 'next/image'
import React from 'react'

export default function CardImage({ src, alt }: CardImageProps) {
    return (
        <div className='w-full h-full rounded-lg z-50 relative'>
            <Image
                className='w-full min-h-[150px] max-h-full object-cover object-bottom rounded-lg z-50'
                alt={alt}
                src={src}
                width={1920}
                height={1080}
                quality={100}
                sizes='(min-width: 768px) 50vw, 100vw'
            />
        </div>
    )
}
