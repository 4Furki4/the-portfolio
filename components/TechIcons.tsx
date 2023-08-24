import React from 'react'
import Image from 'next/image'
import jsIcon from '@/public/js.svg'
import tsIcon from '@/public/ts.svg'
import csIcon from '@/public/cs.svg'
import nextIcon from '@/public/next.svg'
import angularIcon from '@/public/angular.svg'
import netIcon from '@/public/net.svg'
import reactIcon from '@/public/react.svg'
import mysqlLightIcon from '@/public/mysql-light.svg'
import mysqlDarkIcon from '@/public/mysql-dark.svg'
import nodejsIcon from '@/public/nodejs.svg'
import espressjsIcon from '@/public/expressjs.svg'
import prismaIcon from '@/public/prisma.svg'
import mongodb from '@/public/mongodb.svg'

export default function TechIcons() {
    return (
        <>
            <Image
                alt='JS Icon'
                src={jsIcon}
                width={300}
                height={100}
                className='max-w-max w-full h-full'
            />
            <Image
                alt='TS Icon'
                src={tsIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Node.js Icon'
                src={nodejsIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Express.js Icon'
                src={espressjsIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Prisma Icon'
                src={prismaIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='React Icon'
                src={reactIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Next Icon'
                src={nextIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Angular Icon'
                src={angularIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='Net Icon'
                src={netIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='CS Icon'
                src={csIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
            <Image
                alt='MySQL Icon'
                src={mysqlLightIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full dark:hidden'
            />
            <Image
                alt='MySQL Icon'
                src={mysqlDarkIcon}
                width={300}
                height={100}
                className='w-max-w w-full h-full hidden dark:block'
            />
            <Image
                alt='MongoDB Icon'
                src={mongodb}
                width={300}
                height={100}
                className='w-max-w w-full h-full'
            />
        </>
    )
}
