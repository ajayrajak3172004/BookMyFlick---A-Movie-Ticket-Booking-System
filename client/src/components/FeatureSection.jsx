import React from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { dummyShowsData } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


export default function FeatureSection() {

    const navigate = useNavigate()

    const { shows } = useAppContext()

    return (
        <>
            <div className="flex gap-[2%]   flex-wrap content-start  w-full">

                <div id='feature' className='w-full  flex justify-between'>

                    <BlurCircle top='80rem' left='280px' />

                    <h1 className=' md:ml-20  font-bold p-5 text-white mt-30'>Now Showing</h1>
                    <BlurCircle top='50rem' right='0px' />

                    <h1 onClick={() => { navigate('/movies'); scroll(0, 0) }} className='transition-transform duration-300 hover:translate-x-2  md:mr-10 cursor-pointer text-sm  hover:text-md font-semibold p-5 text-white mt-30 flex justify-between items-center'>View all <span><MdOutlineNavigateNext size={20} /></span></h1>
                </div>


                <div className="flex   w-full gap-[2%] flex-wrap  mx-10">

                    {
                        shows.slice(0, 8).map((shows) => (
                            <MovieCard key={shows._id} movie={shows} />

                        ))
                    }



                </div>
                <div className='w-full  flex justify-center my-2'>
                      <button onClick={() => { navigate(`/movies`); scroll(0, 0) }} className="m-8 bg-blue-600 font-bold  text-white px-4 py-1   lg:px-6 lg:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                    Show More
                </button>
                </div>
               


            </div>

        </>
    )
}
