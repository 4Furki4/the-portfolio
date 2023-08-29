import React from 'react'
import CardImage from './CardImage'
import CardDescription from './CardDescription'

export default function CardBody({ images, description }: CardBodyProps) {
    return (
        <div className=''>
            <div className='rounded-lg z-50 relative min-h-[200px] sm:min-h-[350px] h-full w-full overflow-hidden'>
                <CardImage images={images} />
            </div>
            <CardDescription description={description} />
        </div>
    )
}
