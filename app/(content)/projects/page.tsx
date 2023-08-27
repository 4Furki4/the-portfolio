import Card from '@/components/Card/Card'
import React from 'react'
import projects from '@/db/static/projects'
export default function Page() {
    return (
        <div className='z-50 w-11/12 md:w-3/4 mx-auto grid xl:grid-cols-2 gap-4'>
            {projects.map((project, index) => (
                <Card key={index} {...project} />
            ))}
        </div>
    )
}
