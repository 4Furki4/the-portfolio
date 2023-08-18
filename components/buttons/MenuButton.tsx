import React from 'react'
import { motion } from 'framer-motion'
export default function MenuButton({ setIsOpen, isOpen, className }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, isOpen: boolean, className?: string }) {

    return (
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className='z-50 relative w-10 h-10 cursor-pointer'
        >
            <div className='w-[22px] h-[12px]'>
                <motion.span
                    animate={isOpen ? 'open' : 'closed'}
                    variants={{
                        open: {
                            top: 18,
                            rotate: 45,
                        },
                        close: {
                            rotate: 0,
                            top: 0,
                        }
                    }}
                    className='absolute w-full h-[4px] bg-red-700 block top-0'></motion.span>
                <motion.span
                    animate={isOpen ? 'open' : 'closed'}
                    variants={{
                        open: {
                            bottom: 18,
                            rotate: -45,
                        },
                        close: {
                            rotate: 0,
                            bottom: 0,
                        }
                    }}
                    className='absolute w-full h-[4px] bg-red-700 block bottom-0'></motion.span>
            </div>
        </motion.button>
    )
}
