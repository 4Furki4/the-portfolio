import React from 'react'

export default function Tag({ tag }: { tag: string }) {
    return (
        <p className='text-fs-200 bg-foreground-foreground rounded-full px-3 py-1'>
            {tag}
        </p>
    )
}
