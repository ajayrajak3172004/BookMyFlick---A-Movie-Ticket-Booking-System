import React, { useState } from 'react'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { useAppContext } from '../context/AppContext';

export default function HeroSection() {

    const {navigate} = useAppContext()
    // console.log(shows[0].)
    //(movie.backdrop_path  bg-[url('/httyd2.jpg')]
    return (
        <>
            <div id='homeTop' className={` flex gap-[2%] flex-wrap content-start justify-end items-center   h-screen bg-[url('/httyd2.jpg')]  bg-cover md:bg-contain bg-no-repeat  `}>
                <div className=' w-full sm:w-[70%] md:w-[65%] xl:w-[50%] md:h-[50%] mt-28'>

                    <h1 className='m-5 text-4xl md:text-5xl md:text-[70px]  font-bold max-w-full  text-white'>How To  Train </h1>
                    <h1 className='m-5 ml-16 md:ml-20 text-4xl md:text-5xl md:text-[70px]  font-bold max-w-full text-white' > Your <span className='text-green-400'>Dragon</span></h1>

                    <div className='flex items-center gap-4 text-gray-200 m-5 md:text-md text-sm '>
                        <span>Action | Comedy | Adventure </span>
                        <div className='flex justify-center items-center gap-2 '>
                            <IoCalendarNumberOutline size={20} />
                            2025
                        </div>
                        <div className='flex justify-center items-center gap-2 '>
                            <LuClock3 size={20} />
                            2:58 h
                        </div>
                    </div>
                    <p className='text-gray-200   w-[80%] m-5 text-sm md:text-md'>Tells the story of Hiccup, a young Viking who befriends a fearsome Night Fury dragon named Toothless, challenging the long-standing conflict between Vikings and dragons.</p>
                    <button onClick={() => document.getElementById('feature').scrollIntoView({ behavior: 'smooth' })}  className="m-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                        Explore more
                    </button>
                </div>
            </div>
        </>
    )
}
