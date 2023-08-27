import React from 'react'
import { GithubIcon, Link2 as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import externalLinkIcon from '@/public/svgs/external-link.svg'
import Image from 'next/image'
export default function CardFooter() {
    return (
        <div className='flex w-full items-center'>
            <Link
                className='ml-auto rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out'
                href={'#'}>
                <GithubIcon className='w-6 h-6' />
            </Link>
            <Link
                className='rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out'
                href={''}>
                <LinkIcon />
            </Link>
        </div>
    )
}
