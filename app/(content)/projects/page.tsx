import Card from '@/components/Card/Card'
import React from 'react'
import projects from '@/db/static/projects'
export default function Page() {
    return (
        <div className='z-50 p-2 pt-12 lg:w-10/12 mx-auto grid lg:grid-cols-2 gap-4'>
            {projects.map((project, index) => (
                <Card key={index} {...project} />
            ))}
        </div>
    )
}
