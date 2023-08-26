import Image from 'next/image'
import React from 'react'

export default function CardImage({ src, alt }: CardImageProps) {
    return (
        <div className='w-full h-[200px] rounded-lg z-50'>
            <Image
                className='w-full h-full object-cover rounded-lg'
                alt={alt}
                src={src}
                width={500}
                height={500}
                quality={100}
                sizes='(max-width: 500px) 100vw, 500px'
            />
        </div>
    )
}
