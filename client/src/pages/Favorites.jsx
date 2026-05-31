import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'


export default function Favorites() {

    const navigate = useNavigate()

    const{favoriteMovies} = useAppContext()

    return favoriteMovies.length > 0 ?(
        <>
            <div className="flex gap-[2%] flex-wrap content-start  h-full w-full">

                <div className='w-full  flex justify-between'>

                    <BlurCircle top='10rem' left='20px' />

                    <h1 className=' md:ml-20  font-bold p-5 text-white mt-30'>Your Favorites Shows</h1>
                    <BlurCircle top='50rem' right='0px' />
                    {/* <h1 onClick={() => navigate('/movies')} className='transition-transform duration-300 hover:translate-x-2  md:mr-10 cursor-pointer text-sm  hover:text-md font-semibold p-5 text-white mt-30 flex justify-between items-center'>View all <span><MdOutlineNavigateNext size={20} /></span></h1> */}
                </div>


                <div className="flex gap-[2%] flex-wrap w-full mx-10">

                    {
                       [...favoriteMovies].reverse().slice().map((shows) => (
                            <MovieCard key={shows._id} movie={shows} />
                        ))
                    }



                </div>


            </div>

        </>
    ) :
    (
        <>
        <div className='w-full h-[20rem] flex justify-center items-center '>
            <h1 className='text-xl sm:text-2xl font-bold text-white'>No Movies Available !</h1>
        </div>
        </>
    )
}
