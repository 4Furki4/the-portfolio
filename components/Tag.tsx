import React from 'react'

export default function Tag({ tag }: { tag: string }) {
    return (
        <p className='rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-semibold text-muted-foreground'>
            {tag}
        </p>
    )
}
