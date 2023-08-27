import Image from 'next/image'
import React from 'react'
import Carousel from '../Carousel'

export default function CardImage({ images }: { images: CardImageProps[] }) {
    return (
        <Carousel images={images} />
    )
}
