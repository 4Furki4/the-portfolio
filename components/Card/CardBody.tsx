import React from 'react'
import CardImage from './CardImage'
import CardDescription from './CardDescription'

export default function CardBody({ images, description }: CardBodyProps) {
    return (
        <div>
            <div
                className='rounded-lg z-50 relative min-h-[150px] sm:min-h-[300px] h-full w-full overflow-hidden'
            >
                <CardImage images={images} />
            </div>
            <div
                className='mt-8'
            >
                <CardDescription description={description} />
            </div>
        </div>
    )
}
