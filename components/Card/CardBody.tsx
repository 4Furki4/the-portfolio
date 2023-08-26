import React from 'react'
import CardImage from './CardImage'
import CardDescription from './CardDescription'

export default function CardBody({ src, alt, description }: CardBodyProps) {
    return (
        <div>
            <CardImage src={src} alt={alt} />
            <CardDescription description={description} />
        </div>
    )
}
