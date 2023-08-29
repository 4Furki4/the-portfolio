import React from 'react'
import { GithubIcon, Link2 as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { Button } from '../ui/button'
export default function CardFooter({ repoLink, demoLink }: CardFooterProps) {
    return (
        <div className='flex w-full items-center max-lg:mt-2'>
            {!demoLink ? (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger
                            asChild
                            className=''>
                            <Link
                                target='_blank'
                                className='ml-auto rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out'
                                href={repoLink}>
                                <GithubIcon className='w-6 h-6' />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <Button className='dark:bg-background dark:text-foreground'>
                                <i>Live Links in the Readme</i>
                            </Button>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) :
                (
                    <Link
                        target='_blank'
                        className='ml-auto rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out'
                        href={repoLink}>
                        <GithubIcon className='w-6 h-6' />
                    </Link>
                )
            }

            {demoLink && (
                <Link
                    target='_blank'
                    className='rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out'
                    href={demoLink}>
                    <LinkIcon />
                </Link>
            )}
        </div>
    )
}
