import Card from '@/components/Card/Card'
import React from 'react'

export default function Page() {
    return (
        <div className='z-50 w-11/12 md:w-3/4 mx-auto grid xl:grid-cols-2 gap-4'>
            <Card
                title='Learnification'
                src='/pics/projects/learnification-preview.png'
                alt='Learnification Preview'
                description='Successfully collaborated with a team of four to develop a dynamic Learning App in the capstone project of the Recoded Bootcamp'
            />
            <Card
                title='Learnification'
                src='/pics/projects/learnification-preview.png'
                alt='Learnification Preview'
                description='Successfully collaborated with a team of four to develop a dynamic Learning App in the capstone project of the Recoded Bootcamp'
            />
            <Card
                title='Learnification'
                src='/pics/projects/learnification-preview.png'
                alt='Learnification Preview'
                description='Successfully collaborated with a team of four to develop a dynamic Learning App in the capstone project of the Recoded Bootcamp'
            />
            <Card
                title='Learnification'
                src='/pics/projects/learnification-preview.png'
                alt='Learnification Preview'
                description='Successfully collaborated with a team of four to develop a dynamic Learning App in the capstone project of the Recoded Bootcamp'
            />
        </div>
    )
}
