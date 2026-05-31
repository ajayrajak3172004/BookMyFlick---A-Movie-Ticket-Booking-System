import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function MovieCard({movie}) {

    const navigate = useNavigate()
    return (
        <>
            <div className={` w-[18rem]  sm:w-[18rem]   flex justify-center items-center p-3 bg-gray-900/60 my-2 rounded-2xl  transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                <div className='w-[100%] h-auto text-white'>
                    <img onClick={()=>{navigate(`/movies/${movie._id}`);scroll(0,0)}} src={movie.backdrop_path} className='w-full  h-[18rem]   my-4 cursor-pointer'></img>
                    <h1 className=' text-xl  text-bold'>{movie.title.length > 25 ? movie.title.slice(0,25)+". . ." : movie.title}</h1>
                    <span className='text-sm text-gray-400'>{new Date(movie.release_date).getFullYear()} - { movie.genres.slice(0,3).map(genres=>genres).join(' | ')}  -{ (Math.floor(movie.runtime/60))}:{ (movie.runtime%60)}h</span>
                    

                    <div className='flex justify-between items-center '>
                        <button onClick={() => {navigate(`/movies/${movie._id}`);scroll(0,0)}} className="mx-5 my-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                            Buy Tickets
                        </button>
                        <span className='flex justify-center items-center'>
                            <MdOutlineStar size={20} />
                            <h2>{movie.averageRating}</h2>
                        </span>

                    </div>

                </div>


            </div>
        </>
    )
}
