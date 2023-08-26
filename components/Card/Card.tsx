import React from 'react'
import CardHeader from './CardHeader'
import CardBody from './CardBody'

export default function Card({ title, src, alt, description }: CardProps) {
    return (
        <div className='z-50 p-4 transition-all duration-300 bg-card/40 backdrop-blur-xs rounded-lg'>
            <CardHeader title={title} />
            <CardBody alt={alt} src={src} description={description} />
        </div>
    )
}
