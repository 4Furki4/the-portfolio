import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Furkan Cengiz',
    description: 'Furkan Cengiz\'s personal website',
}



export default function ContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}
