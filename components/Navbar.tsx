"use client"
import React from 'react'

export default function Navbar() {
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
    }
    return (
        <div>
            <button className='bg-neutral-100 text-slate-900 dark:bg-neutral-800 dark:text-slate-100 p-2 rounded-xl transition-colors duration-300'
                onClick={() => toggleDarkMode()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24" version="1.1"
                >
                    <title>ic_fluent_dark_theme_24_regular</title>
                    <desc>Created with Sketch.</desc>
                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="ic_fluent_dark_theme_24_regular" className='fill-black dark:fill-white transition-colors duration-300' fill-rule="nonzero">
                            <path
                                d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"
                                id="🎨-Color">

                            </path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    )
}
