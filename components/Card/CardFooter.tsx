import React from 'react'
import { GithubIcon, Link2 as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import externalLinkIcon from '@/public/svgs/external-link.svg'
import Image from 'next/image'
export default function CardFooter({ repoLink, demoLink }: CardFooterProps) {
    return (
        <div className='flex w-full items-center'>
            <Link
                target='_blank'
                className='ml-auto rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out'
                href={repoLink}>
                <GithubIcon className='w-6 h-6' />
            </Link>
            <Link
                target='_blank'
                className='rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out'
                href={demoLink}>
                <LinkIcon />
            </Link>
        </div>
    )
}
